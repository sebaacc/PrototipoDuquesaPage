package data

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectToMongoDB() (*mongo.Database, error) {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        return nil, err
    }

    err = client.Ping(context.TODO(), nil)
    if err != nil {
        return nil, err
    }

    db := client.Database("mydb")
    log.Println("Connected to MongoDB!")
    return db, nil
}