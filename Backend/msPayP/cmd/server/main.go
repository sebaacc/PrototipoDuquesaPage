package main

import (
	"MsPayP/internal/insfraestructure/data"
	"log"
	"github.com/gin-gonic/gin"
    "MsPayP/internal/app/repositories_implements"
    "MsPayP/internal/app/service_implements"
	"MsPayP/internal/insfraestructure/routes"
)

func main() {
   
	r := gin.Default()

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

	r.Run(":8080")
}


