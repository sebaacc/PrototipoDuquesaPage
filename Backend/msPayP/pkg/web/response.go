package web

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type errorResponse struct {
	Status  int    `json:"status"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

type response struct {
	Data interface{} `json:"data"`
}

func Success(ctx *gin.Context, status int, data interface{}) {
	ctx.JSON(status, response{
		Data: data,
	})
}

func Failure(ctx *gin.Context, status int, err error) {
	ctx.JSON(status, errorResponse{
		Message: err.Error(),
		Status:  status,
		Code:    http.StatusText(status),
	})
}