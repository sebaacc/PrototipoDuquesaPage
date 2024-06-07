package routes

import (
	"MsPayP/internal/domain/services"
	"MsPayP/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func PaymentStatusRoutes(r *gin.Engine, paymentStatusService services.PaymentStatusService) {
    paymentStatusHandler := handlers.NewPaymentStatusHandler(paymentStatusService)
    paymentStatusRoute := "/payment-status"

    r.GET(paymentStatusRoute + "/findAllPaymentStatuses", paymentStatusHandler.FindAll())
}