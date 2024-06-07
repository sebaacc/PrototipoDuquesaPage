package handlers

import (
    "errors"
    "net/http"

    "github.com/gin-gonic/gin"
    "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
    "gitlab.com/eescarria/ecommerce-equipo4.git/pkg/web"
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductImagesHandler struct {
    s services.ProductImagesService
}

func NewProductImagesHandler(s services.ProductImagesService) *ProductImagesHandler {
    return &ProductImagesHandler{s: s}
}

func (h *ProductImagesHandler) FindAll() gin.HandlerFunc {
    return func(c *gin.Context) {
        productImages, err := h.s.GetAllProductImages()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, productImages)
    }
}

func (h *ProductImagesHandler) Delete() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }

        err = h.s.DeleteProductImage(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Product images not found"))
            return
        }
        web.Success(c, 204, nil)
    }
}