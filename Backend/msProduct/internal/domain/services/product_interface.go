package services

import (
	"mime/multipart"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/dto"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductService interface {
	CreateProduct(product *models.Product, file []*multipart.FileHeader) error
	GetProductByID(id primitive.ObjectID) (*dto.ProductWithSubCategory, error)
	GetAllProducts() ([]*dto.ProductWithSubCategory, error)
	UpdateProduct(product *models.Product) error
	DeleteProduct(id primitive.ObjectID) error
	GetPaginatedProductsWithFilters(page, limit int64, name string, minPrice, maxPrice float64, subCategoryID primitive.ObjectID) ([]models.Product, error)
	IsAmountAvailable(amount uint64, id primitive.ObjectID, buying bool) (bool, error)
	GetMultipleProductsWithId(ids []primitive.ObjectID) ([]*models.Product, error)
    UpdateAvailableAmount(amount uint64, id primitive.ObjectID) error
	GetMultipleProductDtosWithId(ids []primitive.ObjectID) ([]*dto.ProductDto, error)
}
