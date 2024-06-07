package handlers

import (
	"MsPayP/internal/domain/models"
	"MsPayP/internal/domain/services"
	"MsPayP/pkg/web"
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderHandler struct {
    s services.OrderService
}

func NewOrderHandler(s services.OrderService) *OrderHandler {
    return &OrderHandler{s: s}
}

//--------------- Crear ---------------

func (h *OrderHandler) Post() gin.HandlerFunc {
    return func(c *gin.Context) {
        var order models.Order
        err := c.ShouldBindJSON(&order)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid Json"))
            return
        }
        err = h.s.CreateOrder(&order)
        if err != nil {
            web.Failure(c, 400, errors.New("Order creation failure"))
            return
        }
        web.Success(c, 201, order)
    }
}

//--------------- Buscar todos ---------------

func (h *OrderHandler) FindAll() gin.HandlerFunc {
    return func(c *gin.Context) {
        orders, err := h.s.GetAllOrder()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, orders)
    }
}

//--------------- Buscar por ID ---------------

func (h *OrderHandler) FindById() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        order, err := h.s.GetOrderByID(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Order not found"))
            return
        }
        web.Success(c, 200, order)
    }
}

//--------------- Actualizar ---------------

func (h *OrderHandler) Put() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        _, err = h.s.GetOrderByID(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Order not found"))
            return
        }
        var order models.Order
        err = c.ShouldBindJSON(&order)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid Json"))
            return
        }
        err = h.s.UpdateOrder(&order)
        if err != nil {
            web.Failure(c, 409, errors.New("Request failed"))
            return
        }
        web.Success(c, 200, order)
    }
}

//--------------- Borarr ---------------

func (h *OrderHandler) Delete() gin.HandlerFunc {
    return func(c *gin.Context) {
        idParam := c.Param("id")
        id, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
            web.Failure(c, 400, errors.New("Invalid id"))
            return
        }
        err = h.s.DeleteOrder(id)
        if err != nil {
            web.Failure(c, 404, errors.New("Order not found"))
            return
        }
        web.Success(c, 204, nil)
    }
}