package handlers

import (
	"errors"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/web"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductHandler struct {
	s services.ProductService
}

func NewProductHandler(s services.ProductService) *ProductHandler {
	return &ProductHandler{s: s}
}

// Create handles the creation of a new product
func (h *ProductHandler) Post() gin.HandlerFunc {
    return func(c *gin.Context) {
        var product models.Product
        product.Name = c.PostForm("name")
        product.Description = c.PostForm("description")
        subCategoryIdParam := c.PostForm("subCategoryId")
        subCategoryId, err := primitive.ObjectIDFromHex(subCategoryIdParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid categoryId"))
            return
        }
        product.SubCategoryID = subCategoryId

        priceStr := c.PostForm("price")
        price, err := strconv.ParseFloat(priceStr, 64)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid price"))
            return
        }
        product.Price = price

        form, err := c.MultipartForm()
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid form data"))
            return
        }
        files := form.File["images"]
        if len(files) == 0 {
            web.Failure(c, 400, errors.New("No images provided"))
            return
        }

        err = h.s.CreateProduct(&product, files)
        if err != nil {
            web.Failure(c, 400, errors.New("Product creation failure"))
            return
        }

        web.Success(c, 201, product)
    }
}

// FindAll handles the retrieval of all products
func (h *ProductHandler) FindAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		products, err := h.s.GetAllProducts()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, products)
	}
}

// FindById handles the retrieval of a product by its ID
func (h *ProductHandler) FindById() gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			web.Failure(c, 400, errors.New("Invalid id"))
			return
		}
		product, err := h.s.GetProductByID(id)
		if err != nil {
			web.Failure(c, 404, errors.New("Product not found"))
			return
		}
		web.Success(c, 200, product)
	}
}

// Update handles the update of an existing product
func (h *ProductHandler) Put() gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			web.Failure(c, 400, errors.New("Invalid id"))
			return
		}
		_, err = h.s.GetProductByID(id)
		if err != nil {
			web.Failure(c, 404, errors.New("Product not found"))
			return
		}
		var product models.Product
		err = c.ShouldBindJSON(&product)
		if err != nil {
			web.Failure(c, 400, errors.New("Invalid Json"))
			return
		}
		product.ID = id // Ensure the ID is set
		err = h.s.UpdateProduct(&product)
		if err != nil {
			web.Failure(c, 409, errors.New("Request failed"))
			return
		}
		web.Success(c, 200, product)
	}
}

// Delete handles the deletion of a product
func (h *ProductHandler) Delete() gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			web.Failure(c, 400, errors.New("Invalid id"))
			return
		}
		err = h.s.DeleteProduct(id)
		if err != nil {
			web.Failure(c, 404, errors.New("Product not found"))
			return
		}
		web.Success(c, 204, nil)
	}
}
