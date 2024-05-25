package services

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryService interface {
    CreateCategory(category *models.Category) error
    GetCategoryByID(id primitive.ObjectID) (*models.Category, error)
    GetAllCategories() ([]*models.Category, error)
    UpdateCategory(category *models.Category) error
    DeleteCategory(id primitive.ObjectID) error
}

