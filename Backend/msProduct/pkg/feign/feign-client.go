package feign

import (
    "encoding/xml"
    "fmt"
    "io"
    "math/rand"
    "net/http"
    "time"
)

type Application struct {
    XMLName   xml.Name   `xml:"application"`
    Name      string     `xml:"name"`
    Instances []Instance `xml:"instance"`
}

//Datos de la instancia que devuelve el endpoint de eureka: http://localhost:8761/eureka/apps/nombreMicroServicio
//Lo devuelve en formato XML, algo como esto:

/*
<application>
  <name>MS-CART</name>
  <instance>
    <instanceId>localhost:ms-cart:0</instanceId>
    <hostName>localhost</hostName>
    <app>MS-CART</app>
    <ipAddr>192.168.56.1</ipAddr>
    <status>UP</status>
    <overriddenstatus>UNKNOWN</overriddenstatus>
    <port enabled="true">52552</port>
    <securePort enabled="false">443</securePort>
    <countryId>1</countryId>
    <dataCenterInfo class="com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo">
      <name>MyOwn</name>
    </dataCenterInfo>
    <leaseInfo>
      <renewalIntervalInSecs>30</renewalIntervalInSecs>
      <durationInSecs>90</durationInSecs>
      <registrationTimestamp>1717638817768</registrationTimestamp>
      <lastRenewalTimestamp>1717639477853</lastRenewalTimestamp>
      <evictionTimestamp>0</evictionTimestamp>
      <serviceUpTimestamp>1717638816991</serviceUpTimestamp>
    </leaseInfo>
    <metadata class="java.util.Collections$EmptyMap"/>
    <homePageUrl>http://localhost:52552/</homePageUrl>
    <statusPageUrl>http://localhost:52552/actuator/info</statusPageUrl>
    <healthCheckUrl>http://localhost:52552/actuator/health</healthCheckUrl>
    <vipAddress>ms-cart</vipAddress>
    <secureVipAddress>ms-cart</secureVipAddress>
    <isCoordinatingDiscoveryServer>false</isCoordinatingDiscoveryServer>
    <lastUpdatedTimestamp>1717638817769</lastUpdatedTimestamp>
    <lastDirtyTimestamp>1717638816757</lastDirtyTimestamp>
    <actionType>ADDED</actionType>
  </instance>
</application>
*/
type Instance struct {
    InstanceId                   string       `xml:"instanceId"`
    HostName                     string       `xml:"hostName"`
    App                          string       `xml:"app"`
    IPAddr                       string       `xml:"ipAddr"`
    Status                       string       `xml:"status"`
    OverriddenStatus             string       `xml:"overriddenstatus"`
    Port                         Port         `xml:"port"`
    SecurePort                   SecurePort   `xml:"securePort"`
    CountryId                    int          `xml:"countryId"`
    DataCenterInfo               DataCenterInfo `xml:"dataCenterInfo"`
    LeaseInfo                    LeaseInfo    `xml:"leaseInfo"`
    Metadata                     Metadata     `xml:"metadata"`
    HomePageUrl                  string       `xml:"homePageUrl"`
    StatusPageUrl                string       `xml:"statusPageUrl"`
    HealthCheckUrl               string       `xml:"healthCheckUrl"`
    VipAddress                   string       `xml:"vipAddress"`
    SecureVipAddress             string       `xml:"secureVipAddress"`
    IsCoordinatingDiscoveryServer bool        `xml:"isCoordinatingDiscoveryServer"`
    LastUpdatedTimestamp         int64        `xml:"lastUpdatedTimestamp"`
    LastDirtyTimestamp           int64        `xml:"lastDirtyTimestamp"`
    ActionType                   string       `xml:"actionType"`
}

type Port struct {
    Enabled bool `xml:"enabled,attr"`
    Port    int  `xml:",chardata"`
}

type SecurePort struct {
    Enabled bool `xml:"enabled,attr"`
    Port    int  `xml:",chardata"`
}

type DataCenterInfo struct {
    Class string `xml:"class,attr"`
    Name  string `xml:"name"`
}

type LeaseInfo struct {
    RenewalIntervalInSecs int   `xml:"renewalIntervalInSecs"`
    DurationInSecs        int   `xml:"durationInSecs"`
    RegistrationTimestamp int64 `xml:"registrationTimestamp"`
    LastRenewalTimestamp  int64 `xml:"lastRenewalTimestamp"`
    EvictionTimestamp     int64 `xml:"evictionTimestamp"`
    ServiceUpTimestamp    int64 `xml:"serviceUpTimestamp"`
}

type Metadata struct {
    Class string `xml:"class,attr"`
}

func getMsInstances(msName string) ([]Instance, error) {
    url := fmt.Sprintf("http://localhost:8761/eureka/apps/%s", msName)
    resp, err := http.Get(url)

    fmt.Println("nombre ms: " + msName)
    fmt.Println("url ms: " + url)

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

    fmt.Println("Respuesta: ")
    fmt.Println(string(body)) // Convertir []byte a string para imprimir

    var application Application
    if err := xml.Unmarshal(body, &application); err != nil {
        fmt.Println("Error deserializando XML:", err)
        return nil, err
    }

    fmt.Println("Respuesta deserializada completa: ")
    fmt.Printf("%+v\n", application)

    // Verificar instancias dentro de la aplicación
    for _, instance := range application.Instances {
        fmt.Printf("Instancia: %+v\n", instance)
    }

    return application.Instances, nil
}

func GetRandomInstanceURL(msName string) (string, error) {
    instances, err := getMsInstances(msName)
    if err != nil {
        fmt.Println("Error obteniendo instancias:", err)
        return "", err
    }

    if len(instances) == 0 {
        fmt.Println("No se encontraron instancias.")
        return "", fmt.Errorf("no instances found for service %s", msName)
    }

    // Crea un nuevo generador de números aleatorios local
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    randomInstance := instances[r.Intn(len(instances))]

    fmt.Println("Instancia aleatoria seleccionada:")
    fmt.Printf("%+v\n", randomInstance)

    return fmt.Sprintf("http://%s:%d", randomInstance.IPAddr, randomInstance.Port.Port), nil
}
