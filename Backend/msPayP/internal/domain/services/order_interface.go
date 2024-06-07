package services

import (
	//"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"

	"MsPayP/internal/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderService interface {
    CreateOrder(order *models.Order) error
    GetOrderByID(id primitive.ObjectID) (*models.Order, error)
    GetAllOrder() ([]*models.Order, error)
    UpdateOrder(order *models.Order) error
    DeleteOrder(id primitive.ObjectID) error
}

