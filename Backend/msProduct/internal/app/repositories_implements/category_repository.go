package repositories_implement

import (
	"context"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoCategoryRepository struct {
    collection *mongo.Collection
}

func NewMongoCategoryRepository(db *mongo.Database) *MongoCategoryRepository {
    return &MongoCategoryRepository{
        collection: db.Collection("categories"),
    }
}

func (r *MongoCategoryRepository) Create(category *models.Category) error {
    _, err := r.collection.InsertOne(context.TODO(), category)
    return err
}

func (r *MongoCategoryRepository) GetByID(id primitive.ObjectID) (*models.Category, error) {
    var category models.Category
    err := r.collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&category)
    return &category, err
}

func (r *MongoCategoryRepository) GetAll() ([]*models.Category, error) {
    var categories []*models.Category
    cursor, err := r.collection.Find(context.TODO(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.TODO())

    for cursor.Next(context.TODO()) {
        var category models.Category
        cursor.Decode(&category)
        categories = append(categories, &category)
    }

    return categories, cursor.Err()
}

func (r *MongoCategoryRepository) Update(category *models.Category) error {
    _, err := r.collection.UpdateOne(context.TODO(), bson.M{"_id": category.ID}, bson.M{"$set": category})
    return err
}

func (r *MongoCategoryRepository) Delete(id primitive.ObjectID) error {
    _, err := r.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
    return err
}
