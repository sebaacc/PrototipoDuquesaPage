package main

import (
	"fmt"
	"log"
	"math/rand"
	"net"
	"strconv"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/app/repositories_implements"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/app/service_implements"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/data"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/routes"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/eureka"
)

func getRandomPort() string {
	rand.Seed(time.Now().UnixNano())
	return strconv.Itoa(rand.Intn(65535-1024) + 1024) // Genera un puerto aleatorio entre 1024 y 65535
}

func main() {
   
	r := gin.Default()

    //Traemos la alamcenada en el yml
	vp := viper.New()

	vp.SetConfigName("application")
	vp.SetConfigType("yaml")
	vp.AddConfigPath("../../resources")

	if err := vp.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	} else {
		fmt.Println("Config file loaded successfully")
	}

	//Extraemos el nombre del ms del archivo yml
	appName := vp.GetString("instance.app")
	//appId := "mspayp:" + uuid.New().String()
	appId := "localhost:mspayp:0"

	var port string
	var ln net.Listener
	var err error

	// Intentar obtener un puerto libre
	for {
		port = getRandomPort()
		ln, err = net.Listen("tcp", ":"+port)
		if err == nil { //Intentamos abrir un servicio en el puerto aleatorio, y si nos permite hacerlo es que está disponible, si da error es que no
			ln.Close() // Si encontramos un puerto libre, lo Cerramos inmediatamente para liberarlo
			break
		}
		log.Printf("Port %s is in use, trying another port...", port)
	}

	log.Printf("Port %s is available", port)
    
	//Convertimos el número de puerto de un string a un número entero, se crea como string en un primer mometo
	//Ya que la función de arriba de net.listen espera el número de puerto como un string
	portInt, err := strconv.Atoi(port)
	if err != nil {
		log.Fatalf("Error converting port to integer: %v", err)
	}


    //Llamamos a las funciones que inicializan el ciclo de vide de eureka, tanto registarlo, como ponerlo en estado up, y cerrarlo cuando cierre el ms
	eureka.StartClient(appName, appId, portInt)

	db, err := data.ConnectToMongoDB()
	if err != nil {
		log.Fatal(err)
	}

    

    // Inicialización de repositorios basados en la base de datos configurada
    orderRepository := repositories_implement.NewMongoOrderRepository(db)
    paymentMethodRepository := repositories_implement.NewPaymentMethodRepository(db)
    paymentStatusRepository := repositories_implement.NewPaymentStatusRepository(db)
    payRepository := repositories_implement.NewPayRepository(db)

    // Inicialización de servicios pasando los repositorios anteriores
    orderService := services_implement.NewOrderService(orderRepository)
    paymentMethodService := services_implement.NewPaymentMethodService(paymentMethodRepository)
    paymentStatusService := services_implement.NewPaymentStatusService(paymentStatusRepository)
    payService := services_implement.NewPayService(payRepository)

    // Llamado a las rutas, que inicializan los manejadores
    routes.OrderRoutes(r, orderService)
    routes.PaymentMethodRoutes(r, paymentMethodService)
    routes.PaymentStatusRoutes(r, paymentStatusService)
    routes.PayRoutes(r, payService, orderService)

    log.Println("Application started successfully!")

	//Arrancamos nuestra aplicación en el puerto aleatorio
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}



