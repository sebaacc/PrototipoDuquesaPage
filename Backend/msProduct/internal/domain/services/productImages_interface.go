package services

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductImagesService interface {
    GetAllProductImages() ([]*models.ProductImage, error)
    DeleteProductImage(id primitive.ObjectID) error
}
