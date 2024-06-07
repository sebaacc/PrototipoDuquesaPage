package routes

import (
	"MsPayP/internal/domain/services"
	"MsPayP/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func PaymentMethodRoutes(r *gin.Engine, paymentMethodService services.PaymentMethodService) {
    paymentMethodHandler := handlers.NewPaymentMethodHandler(paymentMethodService)
    paymentMethodRoute := "/payment-method"

    r.GET(paymentMethodRoute + "/findAllPaymentMethods", paymentMethodHandler.FindAll())
}