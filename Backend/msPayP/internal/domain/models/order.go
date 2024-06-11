package models


type Order struct {
	
	IdProduct         string             `json:"idproduct" binding:"required"`
	NumberOfUnits     int                `json:"NumberOfUnits " binding:"required"`
	Price         	  float64            `bson:"price" json:"price"`
	
	
}
