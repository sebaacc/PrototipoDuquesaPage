package dto

import "go.mongodb.org/mongo-driver/bson/primitive"

type ProductDto struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name            string             `bson:"name" json:"name"`
	Price           float64            `bson:"price" json:"price"`
	ImageURL        string             `bson:"imageURL" json:"imageURL"`
	SubCategoryName string             `bson:"subCategoryName" json:"subCategoryName"`
}
