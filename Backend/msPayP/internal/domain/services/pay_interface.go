package services

import (
	"context"

	
	"github.com/mercadopago/sdk-go/pkg/preference"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PayService interface {
	CreatePay(ctx context.Context, pay *models.Pay, order *models.Order) (*preference.Response, error)
	GetPayByID(ctx context.Context, id primitive.ObjectID) (*models.Pay, error)
	UpdatePay(ctx context.Context, id primitive.ObjectID, pay *models.Pay) error
	DeletePay(ctx context.Context, id primitive.ObjectID) error
	UpdatePaymentStatus(payID primitive.ObjectID, paymentStatus string) error
	GetAllPay() ([]*models.Pay, error)
	ProcessWebhook(ctx context.Context, dataID, xRequestId, xSignature, secret string) error
    CreatePreference(ctx context.Context, pay *models.Pay) (*preference.Response, error)
	GetPayByUserID(userID string) ([]models.Pay, error)
}

//ProcessWebhook(ctx context.Context, dataID, xRequestId, xSignature, secret string) error