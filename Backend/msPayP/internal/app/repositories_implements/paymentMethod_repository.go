package repositories_implement

import (
	"MsPayP/internal/domain/models"
	"MsPayP/internal/domain/repositories"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type paymentMethodRepository struct {
    collection *mongo.Collection
}

func NewPaymentMethodRepository(db *mongo.Database) repositories.PaymentMethodRepository {
    return &paymentMethodRepository{
        collection: db.Collection("paymentmethod"),}
}


func (r *paymentMethodRepository) GetAllPaymentMethods() ([]models.PaymentMethod, error) {
    var paymentMethods []models.PaymentMethod

    cursor, err := r.collection.Find(context.Background(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var paymentMethod models.PaymentMethod
        if err := cursor.Decode(&paymentMethod); err != nil {
            return nil, err
        }
        paymentMethods = append(paymentMethods, paymentMethod)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return paymentMethods, nil
}