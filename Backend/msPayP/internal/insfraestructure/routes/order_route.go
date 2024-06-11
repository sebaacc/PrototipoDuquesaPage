package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func OrderRoutes(r *gin.Engine, orderService services.OrderService) {

	orderHandler := handlers.NewOrderHandler(orderService)
	orderRoute := "/order"

	r.GET(orderRoute+"/findAllOrder", orderHandler.FindAll())
	r.GET(orderRoute+"/findOrderById/:id", orderHandler.FindById())
	r.POST(orderRoute+"/createOrder", orderHandler.Post())
	r.PUT(orderRoute+"/updateOrder/:id", orderHandler.Put())
	r.DELETE(orderRoute+"/deleteOrder/:id",orderHandler.Delete())
}
