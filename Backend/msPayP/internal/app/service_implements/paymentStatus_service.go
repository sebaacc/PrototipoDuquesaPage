package services_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
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