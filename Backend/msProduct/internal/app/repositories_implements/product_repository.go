package repositories_implement

import (
	"context"
	"log"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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



func (r *MongoProductRepository) GetPaginatedProductsWithFilters(page, limit int64, name string, minPrice, maxPrice float64, subCategoryID primitive.ObjectID) ([]models.Product, error) {
    filters := r.BuildFilters(name, minPrice, maxPrice, subCategoryID)

    var products []models.Product
    findOptions := options.Find()
    findOptions.SetSkip((page - 1) * limit)
    findOptions.SetLimit(limit)

    cursor, err := r.collection.Find(context.TODO(), filters, findOptions)
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.TODO())

    for cursor.Next(context.TODO()) {
        var product models.Product
        if err := cursor.Decode(&product); err != nil {
            log.Println("Error decoding product:", err)
            continue
        }
        products = append(products, product)
    }

    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return products, nil
}

func (r *MongoProductRepository) BuildFilters(name string, minPrice, maxPrice float64, subCategoryID primitive.ObjectID) bson.M {
    filters := bson.M{}

    if name != "" {
        filters["name"] = bson.M{"$regex": name, "$options": "i"} // Búsqueda de nombre con regex
    }
    if minPrice >= 0 && maxPrice > 0 && minPrice <= maxPrice {
        filters["price"] = bson.M{"$gte": minPrice, "$lte": maxPrice}
    }
    if !subCategoryID.IsZero() {
        filters["subCategoryId"] = subCategoryID
    }

    return filters
}

