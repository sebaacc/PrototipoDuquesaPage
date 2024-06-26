package models


type Order struct {
	
	IdProduct         string             `json:"idproduct" binding:"required"`
	NumberOfUnits     float64            `json:"numberofunits" binding:"numberofunits"`
	Price         	  float64            `bson:"price" json:"price"`
	
	
}

