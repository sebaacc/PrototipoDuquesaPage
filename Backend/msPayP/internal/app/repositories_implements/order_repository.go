package repositories_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoOrderRepository struct {
    collection *mongo.Collection
}

func NewMongoOrderRepository(db *mongo.Database) *MongoOrderRepository {
    return &MongoOrderRepository{
        collection: db.Collection("orders"),
    }
}
/*
func (r *MongoOrderRepository) Create(order *models.Order) error {
    _, err := r.collection.InsertOne(context.TODO(), order)
    return err
}
*/
func (r *MongoOrderRepository) GetByID(id primitive.ObjectID) (*models.Order, error) {
    var order models.Order
    err := r.collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&order)
    return &order, err
}

func (r *MongoOrderRepository) GetAll() ([]*models.Order, error) {
    var order []*models.Order
    cursor, err := r.collection.Find(context.TODO(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.TODO())

    for cursor.Next(context.TODO()) {
        var category models.Order
        cursor.Decode(&category)
        order = append(order, &category)
    }

    return order, cursor.Err()
}
/*
func (r *MongoOrderRepository) Update(order *models.Order) error {
    _, err := r.collection.UpdateOne(context.TODO(), bson.M{"_id": order.ID}, bson.M{"$set": order})
    return err
}*/

func (r *MongoOrderRepository) Delete(id primitive.ObjectID) error {
    _, err := r.collection.DeleteOne(context.TODO(), bson.M{"_id": id})
    return err
}

