package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type SubCategory struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	CategoryID       primitive.ObjectID `bson:"categoryId" json:"categoryId"`
	Name             string             `bson:"name" json:"name"`
	SubCategoryImage string             `bson:"categoryImage" json:"categoryImage"`
	Description      string             `bson:"description" json:"description"`
}
