package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Pay struct {
	ID           	    primitive.ObjectID  `json:"_id,omitempty" json:"id,omitempty"`
	IdUser              int                 `json:"idUser" json:"name"`
	PaymentMethod	    PaymentMethod       `json:"paymentMethod" json:"description"`
	Date   				primitive.DateTime  `json:"date"`
	TotalPaid   		int                 `json:"totalPaid"`
	PaymentStatus   	PaymentStatus       `json:"paymentStatus"`
	IdTransaction  		string              `json:"idTransaction"`
	Address             string            	`json:"address" binding:"required"`
	DetailAddress       string             	`json:"detailaddress" binding:"required"`
}
