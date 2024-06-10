package repositories

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryRepository interface {
    Create(category *models.Category) error
    GetByID(id primitive.ObjectID) (*models.Category, error)
    GetAll() ([]*models.Category, error)
    Update(category *models.Category) error
    Delete(id primitive.ObjectID) error
}