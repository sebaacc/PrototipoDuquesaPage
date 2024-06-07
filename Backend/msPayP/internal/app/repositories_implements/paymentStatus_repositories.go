package repositories_implement

import (
	"MsPayP/internal/domain/models"
	"MsPayP/internal/domain/repositories"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type paymentStatusRepository struct {
	collection *mongo.Collection
}



func (r *paymentStatusRepository) GetAllPaymentStatus() ([]models.PaymentStatus, error) {
    var statuses []models.PaymentStatus

	cursor, err := r.collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var status models.PaymentStatus
		if err := cursor.Decode(&status); err != nil {
			return nil, err
		}
		statuses = append(statuses, status)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return statuses, nil
}

func NewPaymentStatusRepository(db *mongo.Database) repositories.PaymentStatusRepository {
	return &paymentStatusRepository{
		collection: db.Collection("paymentStatus"),
	}
}

