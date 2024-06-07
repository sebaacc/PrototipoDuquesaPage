package services_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
)

type paymentMethodService struct {
	repo repositories.PaymentMethodRepository
}

func NewPaymentMethodService(repo repositories.PaymentMethodRepository) services.PaymentMethodService {
	return &paymentMethodService{repo}
}

// GetAllPaymentMethods 

func (p *paymentMethodService) GetAllPaymentMethods() ([]models.PaymentMethod, error) {

	paymentMethods, err := p.repo.GetAllPaymentMethods()
	if err != nil {
		return nil, err
	}

	return paymentMethods, nil
}

// ValidatePaymentMethod 

func (p *paymentMethodService) ValidatePaymentMethod(method models.PaymentMethod) (bool, error) {

	// Obtener todos los métodos de pago desde el repositorio
	paymentMethods, err := p.repo.GetAllPaymentMethods()
	if err != nil {
		return false, err
	}

	// Verificar si el método de pago dado está en la lista de métodos de pago
	for _, m := range paymentMethods {
		if m == method {
			return true, nil
		}
	}

	return false, nil
}
