package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/web"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PayHandler struct {
	payService   services.PayService
	orderService services.OrderService
}

func NewPayHandler(payService services.PayService, orderService services.OrderService) *PayHandler {
	return &PayHandler{
		payService:   payService,
		orderService: orderService,
	}
}

/*
	func (h *PayHandler) Post(c *gin.Context) {
	    var pay models.Pay

	    if err := c.ShouldBindJSON(&pay); err != nil {
	        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	        return
	    }

	    // Guardar el pago en la base de datos
	    err := h.payService.CreatePay(c, &pay)
	    if err != nil {
	        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	        return
	    }

	    // Crear automáticamente un order
	    order := models.Order{
	        IdPayment:     pay.ID.Hex(),
	        IdProduct:     "Producto_ID", // Vincularlo con el ID correspondiente del producto.
	        NumberOfUnits: 1, // Cantidad de unidades??????
	    }

	    // Guardar la orden en la base de datos
	    err = h.orderService.CreateOrder(&order)
	    if err != nil {
	        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	        return
	    }

	    c.JSON(http.StatusCreated, gin.H{"message": "Pay and order create successful"})
	}
*/
func (h *PayHandler) GetPayByIDHandler(c *gin.Context) {
	payID := c.Param("id")

	pay, err := h.payService.GetPayByID(c, payID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pay not"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"pay": pay})
}

func (h *PayHandler) UpdatePayHandler(c *gin.Context) {
	payID := c.Param("id")

    id, err := primitive.ObjectIDFromHex(payID)
        if err != nil {
            web.Failure(c, http.StatusBadRequest, errors.New("invalid id"))
            return
        }

	var pay models.Pay
	if err := c.ShouldBindJSON(&pay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.payService.UpdatePay(c, id, &pay); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo actualizar el pago"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pago actualizado exitosamente", "pay": pay})
}

//-----------
func (h *PayHandler) DeletePayHandler(c *gin.Context) {
	payID := c.Param("id")

    id, err := primitive.ObjectIDFromHex(payID)
        if err != nil {
            web.Failure(c, http.StatusBadRequest, errors.New("invalid id"))
            return
        }

	if err := h.payService.DeletePay(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo eliminar el pago"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pago eliminado exitosamente"})
}

// ----------------------------------------------------------------------------

func (h *PayHandler) Post(c *gin.Context) {

	var pay models.Pay

	if err := c.ShouldBindJSON(&pay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Guardar el pago en la base de datos
	err := h.payService.CreatePay(c, &pay)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Pay and order create successful"})

}

func (h *PayHandler) FindAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		orders, err := h.payService.GetAllPay()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, orders)
	}
}

// ---------------------------------------------------------

func (h *PayHandler) UpdatePaymentStatus(c *gin.Context) {
    var request struct {
        PaymentStatus string `json:"paymentStatus"`
    }

    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    id := c.Param("id")
    payID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pay ID"})
        return
    }

    err = h.payService.UpdatePaymentStatus(payID, request.PaymentStatus)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Payment status updated successfully"})
}

/// ---

func (h PayHandler) CreatePreference(c *gin.Context) {
    preference, err := h.payService.CreatePreference()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"id": preference.ID})
}




func (h PayHandler) HandleWebhook(c *gin.Context) {
    // Obtener el valor de x-signature del header
    xSignature := c.GetHeader("x-signature")
    xRequestId := c.GetHeader("x-request-id")

    // Obtener los parámetros de la URL
    queryParams := c.Request.URL.Query()

    // Extraer el "data.id" de los parámetros de la URL
    dataID := queryParams.Get("data.id")

    // Obtener la clave secreta desde una variable de entorno o configuración
    secret := "CjXlkxPUyfyilAI3nzapvlYGOawfqSda"

    // Pasar los datos al servicio para que procese la lógica adicional
    if err := h.payService.ProcessWebhook(c, dataID, xRequestId, xSignature, secret); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Webhook processed successfully"})
}