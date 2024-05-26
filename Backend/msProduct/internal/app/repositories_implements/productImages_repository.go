package repositories_implement

import (
	"context"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoProductImagesRepository struct {
	collection *mongo.Collection
}

func NewMongoProductImagesRepository(db *mongo.Database) *MongoProductImagesRepository {
	return &MongoProductImagesRepository{
		collection: db.Collection("productImages"),
	}
}


func (r *MongoProductImagesRepository) GetAll() ([]*models.ProductImage, error) {
    var productImages []*models.ProductImage
    cursor, err := r.collection.Find(context.TODO(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.TODO())
    for cursor.Next(context.TODO()) {
        var productImage models.ProductImage
        err := cursor.Decode(&productImage)
        if err != nil {
            return nil, err
        }
        productImages = append(productImages, &productImage)
    }
    return productImages, cursor.Err()
}
func (r *MongoProductImagesRepository) Delete(id primitive.ObjectID) error {
	_, err := r.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}
