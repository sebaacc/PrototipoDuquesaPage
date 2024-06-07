package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func PaymentStatusRoutes(r *gin.Engine, paymentStatusService services.PaymentStatusService) {
    paymentStatusHandler := handlers.NewPaymentStatusHandler(paymentStatusService)
    paymentStatusRoute := "/payment-status"

    r.GET(paymentStatusRoute + "/findAllPaymentStatuses", paymentStatusHandler.FindAll())
}