package methodsimplements

import (
	"fmt"
	"net/http"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/feign"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func DeleteProductInCarts(id primitive.ObjectID) error {

url, err := feign.GetRandomInstanceURL("ms-cart")
	fmt.Println(url)
    if err != nil {
		fmt.Println("Ha llegado 2")
		fmt.Println(err)
        return err
    }

    // Construye la URL para la petición DELETE
    deleteURL := fmt.Sprintf("%s/cart/removeProductFromAllCarts/%s", url, id.Hex())

	fmt.Println("Url")
	fmt.Println(deleteURL)

    // Crea una petición DELETE
    req, err := http.NewRequest("DELETE", deleteURL, nil)
    if err != nil {
		fmt.Println("Ha llegado 3")
		fmt.Println(err)
        return err
    }

    // Envia la petición
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
		fmt.Println("Ha llegado 4")
		fmt.Println(err)
        return err
    }
    defer resp.Body.Close()
	
    // Verifica el código de estado de la respuesta
    if resp.StatusCode != http.StatusOK {
		fmt.Println("Ha llegado 5")
		fmt.Println(err)
        return err
    }

	return nil

}