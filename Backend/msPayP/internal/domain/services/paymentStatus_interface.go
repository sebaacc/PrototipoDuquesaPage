package services

import "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"

type PaymentStatusService interface {
    GetAllPaymentStatus() ([]models.PaymentStatus, error)
}