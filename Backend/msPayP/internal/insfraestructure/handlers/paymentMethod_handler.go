package handlers

import (
	"MsPayP/internal/domain/services"
	"net/http"
	"github.com/gin-gonic/gin"
)

type PaymentMethodHandler struct {
    s services.PaymentMethodService
}

func NewPaymentMethodHandler(s services.PaymentMethodService) *PaymentMethodHandler {
    return &PaymentMethodHandler{s: s}
}

//---------- Buscar todos los metodos de pago ----------

func (h *PaymentMethodHandler) FindAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		paymentMethod, err := h.s.GetAllPaymentMethods()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, paymentMethod)
	}
}

