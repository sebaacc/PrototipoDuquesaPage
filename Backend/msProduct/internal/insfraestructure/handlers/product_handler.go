package handlers

import (
	"errors"
	"net/http"
	"strconv"
	"strings"

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
		amountParam := c.PostForm("amount")

		convertedAmount, err := strconv.ParseUint(amountParam, 10, 64)

		if err != nil {
			web.Failure(c, 400, errors.New("Invalid amount"))
			return
		}

		product.Amount = convertedAmount

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

func (h *ProductHandler) IsAmountAvailable() gin.HandlerFunc {
	return func(c *gin.Context) {

		idParam := c.Param("id")
		amountStr := c.Param("amount")

		buying := c.Param("buying")
		buyingConverted, err := strconv.ParseBool(buying)
		if err != nil {
			// Manejo de errores
			return
		}

		//Extraemos el parámetro cantidad y lo convertimos en uint
		amountInt64, err := strconv.ParseUint(amountStr, 10, 64)

		id, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			web.Failure(c, 400, errors.New("Invalid id"))
			return
		}

		available, err := h.s.IsAmountAvailable(amountInt64, id, buyingConverted)
		/*
			if err != nil {
				web.Failure(c, 404, errors.New("Product not found"))
				return
			}
		*/
		web.Success(c, 200, available)
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

// GetPaginatedProductsWithFilters handles the retrieval of paginated products with filters
func (h *ProductHandler) GetPaginatedProductsWithFilters() gin.HandlerFunc {
	return func(c *gin.Context) {
		pageStr := c.Query("page")
		limitStr := c.Query("limit")
		name := c.Query("name")
		minPriceStr := c.Query("minPrice")
		maxPriceStr := c.Query("maxPrice")
		subCategoryIdStr := c.Query("subCategoryId")

		page, err := strconv.ParseInt(pageStr, 10, 64)
		if err != nil || page < 1 {
			page = 1
		}

		limit, err := strconv.ParseInt(limitStr, 10, 64)
		if err != nil || limit < 1 {
			limit = 10
		}

		minPrice, _ := strconv.ParseFloat(minPriceStr, 64)
		maxPrice, _ := strconv.ParseFloat(maxPriceStr, 64)

		var subCategoryID primitive.ObjectID
		if subCategoryIdStr != "" {
			subCategoryID, err = primitive.ObjectIDFromHex(subCategoryIdStr)
			if err != nil {
				web.Failure(c, 400, errors.New("Invalid subCategoryId"))
				return
			}
		}

		products, err := h.s.GetPaginatedProductsWithFilters(page, limit, name, minPrice, maxPrice, subCategoryID)
		if err != nil {
			web.Failure(c, 500, errors.New("Failed to get products"))
			return
		}

		web.Success(c, 200, products)
	}
}

func (h *ProductHandler) GetMultipleProducts() gin.HandlerFunc {
    return func(c *gin.Context) {
        ids := c.Query("ids")
        if ids == "" {
            web.Failure(c, http.StatusBadRequest, errors.New("La lista de IDs es requerida"))
            return
        }

        idsList := strings.Split(ids, ",")
        objectIDs := make([]primitive.ObjectID, 0, len(idsList))

        for _, id := range idsList {
            objectID, err := primitive.ObjectIDFromHex(id)
            if err != nil {
                web.Failure(c, http.StatusBadRequest, errors.New("ID inválido: "+id))
                return
            }
            objectIDs = append(objectIDs, objectID)
        }

        products, err := h.s.GetMultipleProductsWithId(objectIDs)
        if err != nil {
            web.Failure(c, http.StatusInternalServerError, err)
            return
        }

        web.Success(c, http.StatusOK, products)
    }
}


func (h *ProductHandler) UpdateAvailableAmount() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        amountStr := c.Param("amount")

        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, http.StatusBadRequest, errors.New("ID inválido: "+idParam))
            return
        }

        amount, err := strconv.ParseUint(amountStr, 10, 64)
        if err != nil {
            web.Failure(c, http.StatusBadRequest, errors.New("Cantidad inválida: "+amountStr))
            return
        }

        err = h.s.UpdateAvailableAmount(amount, id)
        if err != nil {
            web.Failure(c, http.StatusInternalServerError, err)
            return
        }

        web.Success(c, http.StatusOK, nil)
    }
}
