package services_implement

import (
    "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
    "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
    "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type productImagesService struct {
    repo repositories.ProductImagesRepository
}

func NewProductImagesService(repo repositories.ProductImagesRepository) services.ProductImagesService {
    return &productImagesService{
        repo: repo,
    }
}

func (s *productImagesService) GetAllProductImages() ([]*models.ProductImage, error) {
    return s.repo.GetAll()
}


func (s *productImagesService) DeleteProductImage(id primitive.ObjectID) error {
    return s.repo.Delete(id)
}

