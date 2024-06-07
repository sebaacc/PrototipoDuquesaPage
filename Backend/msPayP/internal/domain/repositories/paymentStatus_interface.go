package repositories

import "MsPayP/internal/domain/models"

type PaymentStatusRepository interface {
    GetAllPaymentStatus() ([]models.PaymentStatus, error)
}
