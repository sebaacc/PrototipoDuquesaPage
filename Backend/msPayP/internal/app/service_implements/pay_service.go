package services_implement

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strings"

	"time"

	"github.com/mercadopago/sdk-go/pkg/config"
	"github.com/mercadopago/sdk-go/pkg/preference"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type payService struct {
	repo repositories.PayRepository
}

func NewPayService(repo repositories.PayRepository) services.PayService {
	return &payService{repo}
}

// 1 2 3 4

// GetAllPay implements services.PayService.
func (s *payService) GetAllPay() ([]*models.Pay, error) {
	return s.repo.GetAll()
}

func (s *payService) CreatePay(ctx context.Context, pay *models.Pay) error {
	pay.ID = primitive.NewObjectID()
	pay.Date = primitive.NewDateTimeFromTime(time.Now())
	return s.repo.CreatePay(ctx, pay)

}

func (s *payService) GetPayByID(ctx context.Context, id string) (*models.Pay, error) {
	return s.repo.GetPayByID(ctx, id)
}

func (s *payService) UpdatePay(ctx context.Context, id primitive.ObjectID, pay *models.Pay) error {
	return s.repo.UpdatePay(ctx, id, pay)
}

func (s *payService) DeletePay(ctx context.Context, id primitive.ObjectID) error {

	return s.repo.DeletePay(ctx, id)
}

/*
func (s *productService) DeleteProduct(id primitive.ObjectID) error {
    // Elimina el producto del repositorio
    if err := s.repo.Delete(id); err != nil {
		fmt.Println("Ha llegado 1")
		fmt.Println(err)
        return err
    }

    //Mandamos una petición al ms-cart para que elimine el producto de todos los carritos
    go methodsimplements.DeleteProductInCarts(id);


    return nil
}*/

func (s *payService) UpdatePaymentStatus(payID primitive.ObjectID, paymentStatus string) error {
	return s.repo.UpdatePaymentStatus(payID, paymentStatus)
}

/*
Video youtube: https://www.youtube.com/watch?v=vXqo-hgvvZU
Documentación webhooks: https://www.mercadopago.com.co/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications/webhooks#editor_8
Integración front: https://www.mercadopago.com.co/developers/es/docs/checkout-pro/integrate-checkout-pro/web#editor_4
Creación de preferencias(pagos): https://www.mercadopago.com.co/developers/es/docs/checkout-pro/integrate-preferences#editor_7

la url del webhook(Endpoint en el que recibiremos la confiramción del pago) la podremos en nuestra cuenta de mercado pago(A investiger(¿Se puede poner en la creación de la preferencia? ¿Qué implicaciones tendría?))
*/

func (s *payService) ProcessWebhook(ctx context.Context, dataID, xRequestId, xSignature, secret string) error {
	// Separar el x-signature en partes
	parts := strings.Split(xSignature, ",")

	// Inicializar variables para almacenar ts y hash
	var ts, hash string

	// Iterar sobre los valores para obtener ts y v1
	for _, part := range parts {
		// Dividir cada parte en clave y valor
		keyValue := strings.SplitN(part, "=", 2)
		if len(keyValue) == 2 {
			key := strings.TrimSpace(keyValue[0])
			value := strings.TrimSpace(keyValue[1])
			if key == "ts" {
				ts = value
			} else if key == "v1" {
				hash = value
			}
		}
	}

	// Verificar si se encontraron ts y hash
	if ts == "" || hash == "" {
		return fmt.Errorf("Invalid x-signature format")
	}

	// Generar la cadena manifest
	manifest := fmt.Sprintf("id:%v;request-id:%v;ts:%v;", dataID, xRequestId, ts)

	// Crear una firma HMAC definiendo el tipo de hash y la clave como un array de bytes
	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(manifest))

	// Obtener el resultado del hash como una cadena hexadecimal
	calculatedHash := hex.EncodeToString(h.Sum(nil))

	if calculatedHash == hash {
		// Verificación HMAC aprobada
		fmt.Println("HMAC verification passed")
		// Aquí puedes agregar la lógica para procesar la notificación
		// Por ejemplo, consultar el pago y actualizar la base de datos
		return nil
	} else {
		// Verificación HMAC fallida
		fmt.Println("HMAC verification failed")
		return fmt.Errorf("Invalid HMAC signature")
	}
}

func (s *payService) CreatePreference() (*preference.Response, error) {
	fmt.Println("Iniciando CreatePreference")

	// Configurar credenciales de Mercado Pago
	cfg, err := config.New("{{APP_USR-2642587301219287-062217-a157595881172d53943208877ba1533d-1868085675}}")
	if err != nil {
		fmt.Println("Error al configurar credenciales:", err)
		return nil, err
	}
	fmt.Println("Credenciales configuradas correctamente")

	client := preference.NewClient(cfg)
	fmt.Println("Cliente de preferencia creado")

	request := preference.Request{
		Items: []preference.ItemRequest{
			{
				Title:     "My product",
				Quantity:  1,
				UnitPrice: 75.76,
			},
		},
		/*
		   BackURLs: &preference.BackURLsRequest{
		       Success: "http://your-success-url.com",
		       Failure: "http://your-failure-url.com",
		       Pending: "http://your-pending-url.com",
		   },
		*/
		//NotificationURL: "http://your-notification-url.com/webhooks",
	}
	fmt.Printf("Request creado: %+v\n", request)

	resource, err := client.Create(context.Background(), request)
	if err != nil {
		fmt.Println("Error al crear la preferencia:", err)
		return nil, err
	}
	fmt.Println("Preferencia creada exitosamente")
	fmt.Printf("Recurso obtenido: %+v\n", resource)

	return resource, nil
}
