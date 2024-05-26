package repositories_implement

import (
	"context"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoProductRepository struct {
	collection *mongo.Collection
}

func NewMongoProductRepository(db *mongo.Database) *MongoProductRepository {
	return &MongoProductRepository{
		collection: db.Collection("products"),
	}
}

func (r *MongoProductRepository) Create(product *models.Product) error {
	_, err := r.collection.InsertOne(context.TODO(), product)
	return err
}

func (r *MongoProductRepository) GetByID(id primitive.ObjectID) (*models.Product, error) {
	var product models.Product
	err := r.collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&product)
	return &product, err
}

func (r *MongoProductRepository) GetAll() ([]*models.Product, error) {
	var products []*models.Product
	cursor, err := r.collection.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var product models.Product
		cursor.Decode(&product)
		products = append(products, &product)
	}

	return products, cursor.Err()
}

func (r *MongoProductRepository) Update(product *models.Product) error {
	_, err := r.collection.UpdateOne(context.TODO(), bson.M{"_id": product.ID}, bson.M{"$set": product})
	return err
}

func (r *MongoProductRepository) Delete(id primitive.ObjectID) error {
	_, err := r.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}

func (r *MongoProductRepository) DeleteBySubCategoryID(subCategoryID primitive.ObjectID) error {
    _, err := r.collection.DeleteMany(context.TODO(), bson.M{"subCategoryId": subCategoryID})
    return err
}
