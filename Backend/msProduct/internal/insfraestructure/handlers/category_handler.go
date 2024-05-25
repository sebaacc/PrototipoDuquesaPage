package handlers

import (
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/web"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryHandler struct {
    s services.CategoryService
}

func NewCategoryHandler(s services.CategoryService) *CategoryHandler {
    return &CategoryHandler{s: s}
}

func (h *CategoryHandler) FindAll() gin.HandlerFunc {
    return func(c *gin.Context) {
        categories, err := h.s.GetAllCategories()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, categories)
    }
}

func (h *CategoryHandler) FindById() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        category, err := h.s.GetCategoryByID(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Category not found"))
            return
        }
        web.Success(c, 200, category)
    }
}

func (h *CategoryHandler) Post() gin.HandlerFunc {
    return func(c *gin.Context) {
        var category models.Category
        err := c.ShouldBindJSON(&category)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid Json"))
            return
        }
        err = h.s.CreateCategory(&category)
        if err != nil {
            web.Failure(c, 400, errors.New("Category creation failure"))
            return
        }
        web.Success(c, 201, category)
    }
}

func (h *CategoryHandler) Put() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        _, err = h.s.GetCategoryByID(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Category not found"))
            return
        }
        var category models.Category
        err = c.ShouldBindJSON(&category)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid Json"))
            return
        }
        err = h.s.UpdateCategory(&category)
        if err != nil {
            web.Failure(c, 409, errors.New("Request failed"))
            return
        }
        web.Success(c, 200, category)
    }
}

func (h *CategoryHandler) Delete() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        err = h.s.DeleteCategory(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Category not found"))
            return
        }
        web.Success(c, 204, nil)
    }
}