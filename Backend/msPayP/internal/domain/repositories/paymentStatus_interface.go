package repositories

import "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"

type PaymentStatusRepository interface {
    GetAllPaymentStatus() ([]models.PaymentStatus, error)
}
