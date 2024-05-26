package services

import (
	"mime/multipart"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SubCategoryService interface {
    CreateSubCategory(category *models.SubCategory, file *multipart.FileHeader) error 
    GetSubCategoryByID(id primitive.ObjectID) (*models.SubCategory, error)
    GetAllSubCategories() ([]*models.SubCategory, error)
    UpdateSubCategory(category *models.SubCategory) error
    DeleteSubCategory(id primitive.ObjectID) error
    DeleteSubCategoryByCategoryId(id primitive.ObjectID) error
}

