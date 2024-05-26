package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func CategoryRoutes(r *gin.Engine, categoryService services.CategoryService) {

	categoryHandler := handlers.NewCategoryHandler(categoryService)
	categoryRoute := "/category"

	r.GET(categoryRoute+"/findAllCategories", categoryHandler.FindAll())
	r.GET(categoryRoute+"/findCategoryById/:id", categoryHandler.FindById())
	r.POST(categoryRoute+"/createCategory", categoryHandler.Post())
	r.PUT(categoryRoute+"/updateCategory/:id", categoryHandler.Put())
	r.DELETE(categoryRoute+"/deleteCategory/:id",categoryHandler.Delete())
}