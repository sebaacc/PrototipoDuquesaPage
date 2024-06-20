package services

import (
	"context"

	"github.com/mercadopago/sdk-go/pkg/preference"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
)

type PayService interface {
	CreatePay(ctx context.Context, pay *models.Pay) error
	GetPayByID(ctx context.Context, id string) (*models.Pay, error)
	UpdatePay(ctx context.Context, id string, pay *models.Pay) error
	DeletePay(ctx context.Context, id string) error
	ProcessWebhook(ctx context.Context, dataID, xRequestId, xSignature, secret string) error
	CreatePreference() (*preference.Response, error)
}
