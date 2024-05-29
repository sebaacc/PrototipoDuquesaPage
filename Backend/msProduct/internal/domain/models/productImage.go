package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ProductImage struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	ProductID primitive.ObjectID `bson:"productId" json:"productId"`
	ImageUrl  string             `bson:"imageUrl" json:"imageUrl"`
}
