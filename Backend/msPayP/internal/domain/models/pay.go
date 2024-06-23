package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Pay struct {
	ID           	    primitive.ObjectID  `bson:"_id,omitempty" json:"id,omitempty"`
	IdUser              int                 `bson:"idUser" json:"iduser"`
	PaymentMethod	    PaymentMethod       `bson:"paymentMethod" json:"paymentMethod"`
	Date   				primitive.DateTime  `json:"date"`
	TotalPaid   		int                 `json:"totalPaid"`
	PaymentStatus   	PaymentStatus       `json:"paymentStatus"`
	IdTransaction  		string              `json:"idTransaction"`
	Address             string            	`json:"address" binding:"required"`
	DetailAddress       string             	`json:"detailaddress" binding:"required"`

	// Con este hago un array de ordenes con el objetivo de crear una sola tabla en la bd, donde me da el pago y todos las ordenes. 

	AllOrders []Order `bson:"allOrdedrs" json:"allOrders"`
}
