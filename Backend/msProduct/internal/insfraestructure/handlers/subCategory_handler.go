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

type SubCategoryHandler struct {
    s services.SubCategoryService
}

func NewSubCategoryHandler(s services.SubCategoryService) *SubCategoryHandler {
    return &SubCategoryHandler{s: s}
}

func (h *SubCategoryHandler) FindAll() gin.HandlerFunc {
    return func(c *gin.Context) {
        subCategories, err := h.s.GetAllSubCategories()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, subCategories)
    }
}

func (h *SubCategoryHandler) FindById() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        subCategory, err := h.s.GetSubCategoryByID(id)
        if err != nil {
            web.Failure(c, 404, errors.New("SubCategory not found"))
            return
        }
        web.Success(c, 200, subCategory)
    }
}

func (h *SubCategoryHandler) Post() gin.HandlerFunc {
    return func(c *gin.Context) {
        var subCategory models.SubCategory

        subCategory.Name = c.PostForm("name")
        subCategory.Description = c.PostForm("description")
        categoryIdParam := c.PostForm("categoryId")
		
        categoryId, err := primitive.ObjectIDFromHex(categoryIdParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid categoryId"))
            return
        }
        subCategory.CategoryID = categoryId

        file, err := c.FormFile("subcategoryImage")
        if err != nil {
            web.Failure(c, 400, errors.New("No image provided"))
            return
        }

        err = h.s.CreateSubCategory(&subCategory, file)
        if err != nil {
            web.Failure(c, 400, errors.New("SubCategory creation failure"))
            return
        }
        web.Success(c, 201, subCategory)
    }
}

func (h *SubCategoryHandler) Put() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        _, err = h.s.GetSubCategoryByID(id)
        if err != nil {
            web.Failure(c, 404, errors.New("SubCategory not found"))
            return
        }
        var subCategory models.SubCategory
        err = c.ShouldBindJSON(&subCategory)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid Json"))
            return
        }
        subCategory.ID = id
        err = h.s.UpdateSubCategory(&subCategory)
        if err != nil {
            web.Failure(c, 409, errors.New("Request failed"))
            return
        }
        web.Success(c, 200, subCategory)
    }
}

func (h *SubCategoryHandler) Delete() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        err = h.s.DeleteSubCategory(id)
        if err != nil {
            web.Failure(c, 404, errors.New("SubCategory not found"))
            return
        }
        web.Success(c, 204, nil)
    }
}
