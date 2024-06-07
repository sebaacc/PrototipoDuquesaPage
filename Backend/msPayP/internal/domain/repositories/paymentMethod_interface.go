package repositories

import "MsPayP/internal/domain/models"

type PaymentMethodRepository interface {
	GetAllPaymentMethods() ([]models.PaymentMethod, error)
}