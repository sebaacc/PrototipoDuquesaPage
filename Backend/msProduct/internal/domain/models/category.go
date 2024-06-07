package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Category struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name          string             `bson:"name" json:"name"`
	CategoryImage string             `bson:"categoryImage" json:"categoryImage"`
	Description   string             `bson:"description" json:"description"`
}
