package repositories

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductRepository interface {
    Create(product *models.Product) error
    GetByID(id primitive.ObjectID) (*models.Product, error)
    GetAll() ([]*models.Product, error)
    Update(product *models.Product) error
    Delete(id primitive.ObjectID) error
}