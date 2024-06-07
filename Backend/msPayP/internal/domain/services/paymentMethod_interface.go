package services

import "MsPayP/internal/domain/models"

type PaymentMethodService interface {

	//Me muestra todos los metodos de pago
	GetAllPaymentMethods() ([]models.PaymentMethod, error)
	//Valida que el metodo elegido es correcto 
	ValidatePaymentMethod(method models.PaymentMethod) (bool, error)
}