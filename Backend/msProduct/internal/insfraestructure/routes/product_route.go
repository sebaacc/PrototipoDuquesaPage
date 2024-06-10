package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func ProductRoutes(r *gin.Engine, productService services.ProductService) {

	productHandler := handlers.NewProductHandler(productService)
	productRoute := "/product"

	r.GET(productRoute+"/findAllProducts", productHandler.FindAll())
	r.GET(productRoute+"/findProductById/:id", productHandler.FindById())
	r.GET(productRoute+"/isProductAmountAvailable/:id/:amount/:buying", productHandler.IsAmountAvailable())
	r.GET(productRoute + "/findMultipleProducts", productHandler.GetMultipleProducts())
	r.GET(productRoute + "/findMultipleProductsDto", productHandler.GetMultipleProductDtosWithId())
	r.POST(productRoute+"/createProduct", productHandler.Post())
	r.PUT(productRoute+"/updateProduct/:id", productHandler.Put())
	r.PATCH(productRoute+"/updateAmount/:id/:amount", productHandler.UpdateAvailableAmount())
	r.DELETE(productRoute+"/deleteProduct/:id", productHandler.Delete())
	r.GET(productRoute+"/paginated", productHandler.GetPaginatedProductsWithFilters()) 

}
