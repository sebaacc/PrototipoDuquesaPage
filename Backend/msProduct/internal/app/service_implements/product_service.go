package services_implement

import (
	"fmt"
	"math/rand"
	"mime/multipart"
	"path/filepath"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type productService struct {
	repo repositories.ProductRepository
}

func NewProductService(repo repositories.ProductRepository) services.ProductService {
	return &productService{repo}
}

func (s *productService) CreateProduct(product *models.Product, files []*multipart.FileHeader) error {
	product.ID = primitive.NewObjectID()

	var imageURLs []string

	for _, file := range files {
		// Generate a unique filename
		filename := fmt.Sprintf("product_%d%s", rand.Int63(), filepath.Ext(file.Filename))
		uploadPath := "C:/Users/felip/Desktop/CTD/Segundo año/ProyectoIntegrador/ecommerce-equipo4/Images/" + filename

		err := utils.SaveFileToSystem(file, uploadPath)
		if err != nil {
			return err
		}

		imageURL := "http://localhost:8000/" + filename
		imageURLs = append(imageURLs, imageURL)
	}

	product.ImageURLs = imageURLs

	err := s.repo.Create(product)
	if err != nil {
		return err
	}

	return nil
}

func (s *productService) GetProductByID(id primitive.ObjectID) (*models.Product, error) {
	return s.repo.GetByID(id)
}

func (s *productService) GetAllProducts() ([]*models.Product, error) {
	return s.repo.GetAll()
}

func (s *productService) UpdateProduct(product *models.Product) error {
	return s.repo.Update(product)
}

func (s *productService) DeleteProduct(id primitive.ObjectID) error {
	return s.repo.Delete(id)
}

func (s *productService) GetPaginatedProductsWithFilters(page, limit int64, name string, minPrice, maxPrice float64, subCategoryID primitive.ObjectID) ([]models.Product, error) {
	return s.repo.GetPaginatedProductsWithFilters(page, limit, name, minPrice, maxPrice, subCategoryID)
}

func (s *productService) IsAmountAvailable(amount uint64, id primitive.ObjectID, buying bool) (bool, error) {
    product, err := s.repo.GetByID(id)
    if err != nil {
        return false, err
    }

    productAmount := product.Amount

	if productAmount < amount {
		return false, nil // La cantidad solicitada no está disponible
	}


    if buying {
		product.Amount = productAmount - amount
        // Actualizar el producto en la base de datos
        err = s.repo.Update(product)
        if err != nil {
            return false, err
        }
    }

    return true, nil
}

func (s *productService) GetMultipleProductsWithId(ids []primitive.ObjectID) ([]*models.Product, error) {
    products, err := s.repo.GetByIDs(ids)

    if err != nil {
        return nil, err
    }

    return products, nil
}

func (s *productService) UpdateAvailableAmount(amount uint64, id primitive.ObjectID) error {
	
    product, err := s.repo.GetByID(id)
    if err != nil {
        return err
    }

    product.Amount = amount

    err = s.repo.Update(product)
    if err != nil {
        return err
    }

    return nil
}


