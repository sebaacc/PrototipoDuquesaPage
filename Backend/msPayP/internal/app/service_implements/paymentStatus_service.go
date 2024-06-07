package services_implement

import (
	"MsPayP/internal/domain/models"
	"MsPayP/internal/domain/repositories"
	"MsPayP/internal/domain/services"
)

type paymentStatusService struct {
	repo repositories.PaymentStatusRepository
}

func NewPaymentStatusService(repo repositories.PaymentStatusRepository) services.PaymentStatusService {
	return &paymentStatusService{repo}
}

func (s *paymentStatusService) GetAllPaymentStatus() ([]models.PaymentStatus, error) {
   
    paymentStatusList := []models.PaymentStatus{
        models.PaymentSuccessful,
        models.PaymentFailed,
        models.PaymentCancelled,
    }

    return paymentStatusList, nil
}