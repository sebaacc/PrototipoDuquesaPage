package repositories

import (
	"context"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PayRepository interface {
    CreatePay(ctx context.Context, pay *models.Pay) error
    GetPayByID(ctx context.Context, id string) (*models.Pay, error)
    UpdatePay(ctx context.Context, id primitive.ObjectID, pay *models.Pay) error
    DeletePay(ctx context.Context, id primitive.ObjectID) error
    UpdatePaymentStatus(payID primitive.ObjectID, paymentStatus string) error
    GetAll() ([]*models.Pay, error)
}