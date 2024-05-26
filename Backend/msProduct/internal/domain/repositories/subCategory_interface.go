package repositories

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SubCategoryRepository interface {
    Create(subCategory *models.SubCategory) error
    GetByID(id primitive.ObjectID) (*models.SubCategory, error)
    GetAll() ([]*models.SubCategory, error)
    Update(category *models.SubCategory) error
    Delete(id primitive.ObjectID) error
	DeleteByCategoryID(categoryID primitive.ObjectID) error
    FindManyByCategoryID(categoryID primitive.ObjectID) ([]*models.SubCategory, error)
}