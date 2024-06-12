package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func PayRoutes(r *gin.Engine, payService services.PayService, orderService services.OrderService) {
    payHandler := handlers.NewPayHandler(payService, orderService) // Pasar ambos servicios aquí
    payRoute := "/pay"

    r.POST(payRoute + "/createPay", payHandler.Post)
    r.GET(payRoute + "/findPayById/:id", payHandler.GetPayByIDHandler)
    r.PUT(payRoute + "/updatePay/:id", payHandler.UpdatePayHandler)
    r.DELETE(payRoute + "/deletePay/:id", payHandler.DeletePayHandler)
}