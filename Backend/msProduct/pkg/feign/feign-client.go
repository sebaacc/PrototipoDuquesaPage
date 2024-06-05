package feign

import (
    "encoding/xml"
    "fmt"
    "io"
    "math/rand"
    "net/http"
    "time"
)

type Applications struct {
    Application Application `xml:"application"`
}

type Application struct {
    Name      string     `xml:"name"`
    Instances []Instance `xml:"instance"`
}

type Instance struct {
    InstanceId string `xml:"instanceId"`
    HostName   string `xml:"hostName"`
    App        string `xml:"app"`
    IPAddr     string `xml:"ipAddr"`
    Status     string `xml:"status"`
    Port       Port    `xml:"port"`
}

type Port struct {
    Port int `xml:",chardata"`
}

func getMsInstances(msName string) ([]Instance, error) {
    url := fmt.Sprintf("http://localhost:8761/eureka/apps/%s", msName)
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("failed to get instances: status code %d", resp.StatusCode)
    }

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var applications Applications
    if err := xml.Unmarshal(body, &applications); err != nil {
        return nil, err
    }

    return applications.Application.Instances, nil
}

func GetRandomInstanceURL(msName string) (string, error) {

    instances, err := getMsInstances(msName)
	
    if err != nil {
		fmt.Println("Llegó 1")
		fmt.Println(err)
        return "", err
    }

    if len(instances) == 0 {
		fmt.Println("Llegó 2")
		fmt.Println(err)
		fmt.Println(instances)
        return "", err
    }

    // Crea un nuevo generador de números aleatorios local
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    randomInstance := instances[r.Intn(len(instances))]

	fmt.Println("holllllll")
	fmt.Println(randomInstance)

    return fmt.Sprintf("http://%s:%d", randomInstance.IPAddr, randomInstance.Port.Port), nil
}
