package services_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type orderService struct {
    repo repositories.OrderRepository
}

func NewOrderService(repo repositories.OrderRepository) services.OrderService {
    return &orderService{repo}
}

// 1 2 3 4 5

func (s *orderService) CreateOrder(order *models.Order) error {
    order.ID = primitive.NewObjectID()
    return s.repo.Create(order)
}

func (s *orderService) GetOrderByID(id primitive.ObjectID) (*models.Order, error) {
    return s.repo.GetByID(id)
}

func (s *orderService) GetAllOrder() ([]*models.Order, error) {
    return s.repo.GetAll()
}

func (s *orderService) UpdateOrder(order *models.Order) error {
    return s.repo.Update(order)
}

func (s *orderService) DeleteOrder(id primitive.ObjectID) error {
    return s.repo.Delete(id)
}