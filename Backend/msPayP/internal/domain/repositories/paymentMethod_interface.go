package repositories

import "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"

type PaymentMethodRepository interface {
	GetAllPaymentMethods() ([]models.PaymentMethod, error)
}