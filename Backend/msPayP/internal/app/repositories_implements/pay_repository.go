package repositories_implement

import (
	"context"
	"fmt"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

// GetAll implements repositories.PayRepository.
func (r *payRepository) GetAll() ([]*models.Pay, error) {
	
	var pay []*models.Pay
	cursor, err := r.collection.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var category models.Pay
		cursor.Decode(&category)
		pay = append(pay, &category)
	}

	return pay, cursor.Err()
}

func (r *payRepository) CreatePay(ctx context.Context, pay *models.Pay) error {
	_, err := r.collection.InsertOne(ctx, pay)
	return err
}

func (r *payRepository) GetPayByID(ctx context.Context, id primitive.ObjectID) (*models.Pay, error) {
	var pay models.Pay
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&pay)
	if err != nil {
		return nil, err
	}
	return &pay, nil
}

func (r *payRepository) UpdatePay(ctx context.Context, id primitive.ObjectID, pay *models.Pay) error {
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": id}, pay)
	return err
}

func (r *payRepository) DeletePay(ctx context.Context, id primitive.ObjectID) error {
	fmt.Println("llega?")
	fmt.Println(id)
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

//

func (r *payRepository) UpdatePaymentStatus(payID primitive.ObjectID, paymentStatus string) error {
    
    filter := bson.M{"_id": payID}
    update := bson.M{"$set": bson.M{"paymentStatus": paymentStatus}}

    _, err := r.collection.UpdateOne(context.Background(), filter, update)
    return err
}

func (r *payRepository) GetPayByUserID(userID string) ([]models.Pay, error) {
    var pays []models.Pay
    filter := bson.M{"idUser": userID}
    cursor, err := r.collection.Find(context.Background(), filter)
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var pay models.Pay
        if err := cursor.Decode(&pay); err != nil {
            return nil, err
        }
        pays = append(pays, pay)
    }
    return pays, cursor.Err()
}