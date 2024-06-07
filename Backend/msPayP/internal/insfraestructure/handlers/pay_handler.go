package handlers

import (
    
    "net/http"
    "github.com/gin-gonic/gin"
    "MsPayP/internal/domain/models"
    "MsPayP/internal/domain/services"
)

type PayHandler struct {
    payService    services.PayService
    orderService  services.OrderService 
}

func NewPayHandler(payService services.PayService, orderService services.OrderService) *PayHandler {
    return &PayHandler{
        payService:    payService,
        orderService:  orderService,
    }
}

func (h *PayHandler) Post(c *gin.Context) {
    var pay models.Pay

    if err := c.ShouldBindJSON(&pay); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Guardar el pago en la base de datos
    err := h.payService.CreatePay(c, &pay)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Crear automáticamente un order
    order := models.Order{
        IdPayment:     pay.ID.Hex(), 
        IdProduct:     "Producto_ID", // Vincularlo con el ID correspondiente del producto.
        NumberOfUnits: 1, // Cantidad de unidades??????
    }

    // Guardar la orden en la base de datos
    err = h.orderService.CreateOrder(&order)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Pay and order create successful"})
}

func (h *PayHandler) GetPayByIDHandler(c *gin.Context) {
    payID := c.Param("id")

    pay, err := h.payService.GetPayByID(c, payID)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Pay not"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"pay": pay})
}

func (h *PayHandler) UpdatePayHandler(c *gin.Context) {
    payID := c.Param("id")

    var pay models.Pay
    if err := c.ShouldBindJSON(&pay); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.payService.UpdatePay(c, payID, &pay); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo actualizar el pago"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Pago actualizado exitosamente", "pay": pay})
}

func (h *PayHandler) DeletePayHandler(c *gin.Context) {
    payID := c.Param("id")

    if err := h.payService.DeletePay(c, payID); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo eliminar el pago"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Pago eliminado exitosamente"})
}