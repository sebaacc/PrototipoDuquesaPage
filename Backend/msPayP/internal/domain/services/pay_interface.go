package services

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"context"
)

type PayService interface {
	CreatePay(ctx context.Context, pay *models.Pay) error
	GetPayByID(ctx context.Context, id string) (*models.Pay, error)
	UpdatePay(ctx context.Context, id string, pay *models.Pay) error
	DeletePay(ctx context.Context, id string) error
}
