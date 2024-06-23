package eureka

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
	"codnect.io/chrono"
	"github.com/spf13/viper"
)

// ? ==================== Structs ==================== ?

type AppRegistrationBody struct {
	Instance InstanceDetails `json:"instance"`
}

// * =========== *

type InstanceDetails struct {
	InstanceId       string         `json:"instanceId"`
	HostName         string         `json:"hostName"`
	App              string         `json:"app"`
	VipAddress       string         `json:"vipAddress,omitempty"`
	SecureVipAddress string         `json:"secureVipAddress,omitempty"`
	IpAddr           string         `json:"ipAddr"`
	Status           string         `json:"status"`
	Port             Port           `json:"port"`
	SecurePort       Port           `json:"securePort"`
	HealthCheckUrl   string         `json:"healthCheckUrl"`
	StatusPageUrl    string         `json:"statusPageUrl"`
	HomePageUrl      string         `json:"homePageUrl"`
	DataCenterInfo   DataCenterInfo `json:"dataCenterInfo"`
}

// * =========== *

type DataCenterInfo struct {
	Class string `json:"@class"`
	Name  string `json:"name"`
}

// * =========== *

type Port struct {
	Port    int    `json:"$"`
	Enabled string `json:"@enabled"`
}

// ? ==================== Functions ==================== ?

// ScheduleHeartbeat sends a heartbeat every 25 seconds to keep track of the instance on the Eureka server
func ScheduleHeartbeat(appName string, appId string) chrono.ScheduledTask {

	taskScheduler := chrono.NewDefaultTaskScheduler()

	task, err := taskScheduler.ScheduleWithFixedDelay(func(ctx context.Context) {
		sendHeartbeat(appName, appId)
	}, 25*time.Second)

	if err != nil {
		log.Fatalln(err)
	}

	return task

}

// * =========== *

// Registramos el ms en eureka, mandando una petición post al endpoint de eureka:
//http://localhost:8761/eureka/apps/{nombreMs}
//Con un cuerpo parecido al que vemos en el ejemplo de esa web: https://dzone.com/articles/service-registration-with-go-lang-and-eureka
func RegisterApp(appName string, appId string, port int) {

	log.Println("registering app on Eureka server")

	body := buildBody(appName, appId, port, "STARTING")



	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(body)

	if err != nil {
		log.Fatalln(err)
	}

	server := viper.GetString("eureka.client.service-url.defaultZone")
	if server == "" {
		server = "http://localhost:8761/eureka"
	}


	resp, err := http.Post(server+"/apps/"+appName, "application/json", &buf)

	if err != nil {
		log.Fatalln(err)
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(resp.Body)

	responseBody, parseErr := io.ReadAll(resp.Body)

	if parseErr != nil {
		log.Fatalln(parseErr)
	}

	if string(responseBody) != "" {
		log.Println(string(responseBody))
	}

}

// * =========== *

// UpdateAppStatus updates the status of the instance on the Eureka server
func UpdateAppStatus(appName string, appId string, port int, status string) {

	log.Println("updating app status")

	body := buildBody(appName, appId, port, status)

	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(body)

	if err != nil {
		log.Fatalln(err)
	}

	server := viper.GetString("eureka.client.service-url.defaultZone")
	if server == "" {
		server = "http://localhost:8761/eureka"
	}

	req, err := http.Post(server+"/apps/"+appName, "application/json", &buf)

	if err != nil {
	
		log.Fatalln(err)
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(req.Body)

	responseBody, parseErr := io.ReadAll(req.Body)

	if parseErr != nil {
		log.Fatalln(parseErr)
	}

	if string(responseBody) != "" {
		log.Println(string(responseBody))
	}

}

// * =========== *

// DeleteApp deletes the Eureka server instance
func DeleteApp(appName string, appId string) {

	log.Println("deleting app from Eureka server")

	server := "http://localhost:8761/eureka"


	req, err := http.NewRequest(http.MethodDelete, server+"/apps/"+appName+"/"+appId, nil)

	if err != nil {
		log.Fatalln(err)
	}

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatalln(err)
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(resp.Body)

	responseBody, parseErr := io.ReadAll(resp.Body)

	if parseErr != nil {
		log.Fatalln(parseErr)
	}

	if string(responseBody) != "" {
		log.Println(string(responseBody))
	}

}

// * =========== *

// sendHeartbeat sends a heartbeat to keep track of the instance on the Eureka server
func sendHeartbeat(appName string, appId string) {

	server := viper.GetString("eureka.client.service-url.defaultZone")
	if server == "" {
		server = "http://localhost:8761/eureka"
	}

	req, err := http.NewRequest("PUT", server+"/apps/"+appName+"/"+appId, nil)

	if err != nil {
		log.Fatalln(err)
	}

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatalln(err)
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(resp.Body)

	responseBody, parseErr := io.ReadAll(resp.Body)

	if parseErr != nil {
		log.Fatalln(parseErr)
	}

	if string(responseBody) != "" {
		log.Println(string(responseBody))
	}

}

// * =========== *

// Construimos el cuerpo de la petición
func buildBody(appName string, appId string, port int, status string) *AppRegistrationBody {

	viper.SetConfigName("application")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("../../resources")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}

	hostname := viper.GetString("instance.hostName")


    /*
	homePageUrl := viper.GetString("instance.homePageUrl")
	statusPageUrl := viper.GetString("instance.statusPageUrl")
	healthCheckUrl := viper.GetString("instance.healthCheckUrl")
	*/

	homePageUrl := fmt.Sprintf("http://localhost:%d/", port)
	statusPageUrl := fmt.Sprintf("http://localhost:%d/status", port)
	healthCheckUrl := fmt.Sprintf("http://localhost:%d/healthcheck", port)
	

	dataCenterInfo := DataCenterInfo{
		Class: viper.GetString("instance.dataCenterInfo.class"),
		Name:  viper.GetString("instance.dataCenterInfo.name"),
	}

	basePort := Port{
		Port:    port,
		Enabled: viper.GetString("instance.port.enabled"),
	}

	securePort := Port{
		Port:    viper.GetInt("instance.securePort.number"),
		Enabled: viper.GetString("instance.securePort.enabled"),
	}

	instance := InstanceDetails{
		InstanceId:       appId,
		HostName:         hostname,
		App:              appName,
		VipAddress:       "mspayp",
		SecureVipAddress: "mspayp",
		IpAddr:           viper.GetString("instance.ipAddr"),
		Status:           status,
		Port:             basePort,
		SecurePort:       securePort,
		HealthCheckUrl:   healthCheckUrl,
		StatusPageUrl:    statusPageUrl,
		HomePageUrl:      homePageUrl,
		DataCenterInfo:   dataCenterInfo,
	}

	requestBody := &AppRegistrationBody{Instance: instance}

	return requestBody

}

// * =========== *

// Init initializes Eureka communication
func Init(appName string, appId string, port int) chrono.ScheduledTask {

	log.Println("initializing Eureka: " + appName)


	// Initializes the Eureka server

	RegisterApp(appName, appId, port)
	UpdateAppStatus(appName, appId, port, "UP")
	return ScheduleHeartbeat(appName, appId)

}

// * =========== *

// Stop stops Eureka communication
func Stop(appName string, appId string, port int, task chrono.ScheduledTask) {

	log.Println("stopping Eureka server")

	// Stops communication with the Eureka server.
	task.Cancel()

	//Mandamos una petición post actualizando el estado del ms a DOWN y 5 segundos después mandamos una petición para eliminarlo
	UpdateAppStatus(appName, appId, port, "DOWN")
	time.Sleep(5 * time.Second)
	DeleteApp(appName, appId)

}

// * =========== *

// StartClient Eureka's client starts
func StartClient(appName string, appId string, port int) {

	log.Println("starting Eureka client: " + appName)

	// Initialize the Eureka client

	task := Init(appName, appId, port)

	// Create channel for receiving interrupt signals

	ch := make(chan os.Signal)
	signal.Notify(ch, os.Interrupt)

	// Ejecutamos la función stop cuando deje de funcionar nuestro microservicio
	go func() {
		select {
		case sgn := <-ch:
			_ = sgn
			Stop(viper.GetString("instance.app"), appId, port, task) // Stop Eureka service
			os.Exit(1)
		}
	}()

}
