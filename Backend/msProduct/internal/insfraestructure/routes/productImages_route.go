package routes

import (
    "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
    "github.com/gin-gonic/gin"
)

func ProductImagesRoutes(r *gin.Engine, productImagesService services.ProductImagesService) {
    productImagesHandler := handlers.NewProductImagesHandler(productImagesService)
    productImagesRoute := "/product-images"

    r.GET(productImagesRoute+"/findAllImages", productImagesHandler.FindAll())
    r.DELETE(productImagesRoute+"/deleteImage/:id", productImagesHandler.Delete())
}