package repositories_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)



type payRepository struct {
	collection *mongo.Collection
}
func NewPayRepository(db *mongo.Database) repositories.PayRepository {
    return &payRepository{
		collection: db.Collection("pay"),
	}
}

func (r *payRepository) CreatePay(ctx context.Context, pay *models.Pay) error {
	_, err := r.collection.InsertOne(ctx, pay)
	return err
}

func (r *payRepository) GetPayByID(ctx context.Context, id string) (*models.Pay, error) {
	var pay models.Pay
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&pay)
	if err != nil {
		return nil, err
	}
	return &pay, nil
}

func (r *payRepository) UpdatePay(ctx context.Context, id string, pay *models.Pay) error {
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": id}, pay)
	return err
}

func (r *payRepository) DeletePay(ctx context.Context, id string) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}
