package repositories

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderRepository interface {
    Create(order *models.Order) error
    GetByID(id primitive.ObjectID) (*models.Order, error)
    GetAll() ([]*models.Order, error)
    Update(order *models.Order) error
    Delete(id primitive.ObjectID) error
}