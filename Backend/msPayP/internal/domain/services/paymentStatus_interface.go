package services

import "MsPayP/internal/domain/models"

type PaymentStatusService interface {
    GetAllPaymentStatus() ([]models.PaymentStatus, error)
}