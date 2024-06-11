package services_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"context"
)

type payService struct {
	repo repositories.PayRepository
}

func NewPayService(repo repositories.PayRepository) services.PayService {
	return &payService{repo}
}

// 1 2 3 4

func (s *payService) CreatePay(ctx context.Context, pay *models.Pay) error {
	return s.repo.CreatePay(ctx, pay)
}

func (s *payService) GetPayByID(ctx context.Context, id string) (*models.Pay, error) {
	return s.repo.GetPayByID(ctx, id)
}

func (s *payService) UpdatePay(ctx context.Context, id string, pay *models.Pay) error {
	return s.repo.UpdatePay(ctx, id, pay)
}

func (s *payService) DeletePay(ctx context.Context, id string) error {
	return s.repo.DeletePay(ctx, id)
}