package repositories

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductImagesRepository interface {
    GetAll() ([]*models.ProductImage, error) 
    Delete(id primitive.ObjectID) error
}