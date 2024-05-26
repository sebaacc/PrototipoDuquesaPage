package repositories_implement

import (
	"context"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoSubCategoryRepository struct {
    collection *mongo.Collection
}

func NewMongoSubCategoryRepository(db *mongo.Database) *MongoSubCategoryRepository {
    return &MongoSubCategoryRepository{
        collection: db.Collection("subcategories"),
    }
}

func (r *MongoSubCategoryRepository) Create(subCategory *models.SubCategory) error {
    _, err := r.collection.InsertOne(context.TODO(), subCategory)
    return err
}

func (r *MongoSubCategoryRepository) GetByID(id primitive.ObjectID) (*models.SubCategory, error) {
    var subCategory models.SubCategory
    err := r.collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&subCategory)
    return &subCategory, err
}

func (r *MongoSubCategoryRepository) GetAll() ([]*models.SubCategory, error) {
    var subCategories []*models.SubCategory
    cursor, err := r.collection.Find(context.TODO(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.TODO())

    for cursor.Next(context.TODO()) {
        var subCategory models.SubCategory
        cursor.Decode(&subCategory)
        subCategories = append(subCategories, &subCategory)
    }

    return subCategories, cursor.Err()
}

func (r *MongoSubCategoryRepository) Update(subCategory *models.SubCategory) error {
    _, err := r.collection.UpdateOne(context.TODO(), bson.M{"_id": subCategory.ID}, bson.M{"$set": subCategory})
    return err
}

func (r *MongoSubCategoryRepository) Delete(id primitive.ObjectID) error {
    _, err := r.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
    return err
}

func (r *MongoSubCategoryRepository) DeleteByCategoryID(categoryID primitive.ObjectID) error {
    _, err := r.collection.DeleteMany(context.TODO(), bson.M{"categoryId": categoryID})
    return err
}
