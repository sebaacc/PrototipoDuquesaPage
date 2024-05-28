package services

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"mime/multipart"
)

type ProductService interface {
	CreateProduct(product *models.Product, file []*multipart.FileHeader) error
	GetProductByID(id primitive.ObjectID) (*models.Product, error)
	GetAllProducts() ([]*models.Product, error)
	UpdateProduct(product *models.Product) error
	DeleteProduct(id primitive.ObjectID) error
	GetPaginatedProductsWithFilters(page, limit int64, name string, minPrice, maxPrice float64, subCategoryID primitive.ObjectID) ([]models.Product, error)
}
