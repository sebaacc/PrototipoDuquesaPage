package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order struct {
	ID                primitive.ObjectID `json:"id"`
	IdPayment         string             `json:"idpayment" binding:"required"`
	IdProduct         string             `json:"idproduct" binding:"required"`
	NumberOfUnits     int                `json:"NumberOfUnits " binding:"required"`
	
}
