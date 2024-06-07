package handlers

import (
    "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
    "net/http"
    "github.com/gin-gonic/gin"
)

type PaymentStatusHandler struct {
    s services.PaymentStatusService
}

func NewPaymentStatusHandler(s services.PaymentStatusService) *PaymentStatusHandler {
    return &PaymentStatusHandler{s: s}
}


func (h *PaymentStatusHandler) FindAll() gin.HandlerFunc {
    return func(c *gin.Context) {
        paymentStatus, err := h.s.GetAllPaymentStatus();
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, paymentStatus)
    }
}