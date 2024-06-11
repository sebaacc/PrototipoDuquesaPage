package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func PaymentMethodRoutes(r *gin.Engine, paymentMethodService services.PaymentMethodService) {
    paymentMethodHandler := handlers.NewPaymentMethodHandler(paymentMethodService)
    paymentMethodRoute := "/payment-method"

    r.GET(paymentMethodRoute + "/findAllPaymentMethods", paymentMethodHandler.FindAll())
}