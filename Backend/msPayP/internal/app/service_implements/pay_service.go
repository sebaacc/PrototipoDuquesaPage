package services_implement

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/mercadopago/sdk-go/pkg/config"
	"github.com/mercadopago/sdk-go/pkg/preference"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
)

type payService struct {
	repo repositories.PayRepository
}

func NewPayService(repo repositories.PayRepository) services.PayService {
	return &payService{repo}
}

// 1 2 3 4

func (s *payService) CreatePay(ctx context.Context, pay *models.Pay) error {
	return s.repo.CreatePay(ctx, pay)
}

func (s *payService) GetPayByID(ctx context.Context, id string) (*models.Pay, error) {
	return s.repo.GetPayByID(ctx, id)
}

func (s *payService) UpdatePay(ctx context.Context, id string, pay *models.Pay) error {
	return s.repo.UpdatePay(ctx, id, pay)
}

func (s *payService) DeletePay(ctx context.Context, id string) error {
	return s.repo.DeletePay(ctx, id)
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
    // Configurar credenciales de Mercado Pago
	cfg, err := config.New("{{APP_USR-4772246821378419-061700-737a98b071afc32d25fef14039599c29-1298842399}}")
	if err != nil {
		fmt.Println(err)
	}

    client := preference.NewClient(cfg)

    request := preference.Request{
        Items: []preference.ItemRequest{
            {
                Title:     "Producto de ejemplo",
                Quantity:  1,
                UnitPrice: 100.0,
            },
        },
        BackURLs: &preference.BackURLsRequest{
            Success: "http://your-success-url.com",
            Failure: "http://your-failure-url.com",
            Pending: "http://your-pending-url.com",
        },
        //NotificationURL: "http://your-notification-url.com/webhooks",
    }

    resource, err := client.Create(context.Background(), request)
    if err != nil {
        return nil, err
    }

    fmt.Println(resource)
    return resource, nil
}