package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name          string             `bson:"name" json:"name"`
	Description   string             `bson:"description" json:"description"`
	Price         float64            `bson:"price" json:"price"`
	ImageURLs     []string           `bson:"imageURLs" json:"imageURLs"` 
}
