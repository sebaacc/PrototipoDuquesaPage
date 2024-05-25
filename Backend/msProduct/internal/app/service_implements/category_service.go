package services_implement

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type categoryService struct {
    repo repositories.CategoryRepository
}

func NewCategoryService(repo repositories.CategoryRepository) services.CategoryService {
    return &categoryService{repo}
}

func (s *categoryService) CreateCategory(category *models.Category) error {
    category.ID = primitive.NewObjectID()
    return s.repo.Create(category)
}

func (s *categoryService) GetCategoryByID(id primitive.ObjectID) (*models.Category, error) {
    return s.repo.GetByID(id)
}

func (s *categoryService) GetAllCategories() ([]*models.Category, error) {
    return s.repo.GetAll()
}

func (s *categoryService) UpdateCategory(category *models.Category) error {
    return s.repo.Update(category)
}

func (s *categoryService) DeleteCategory(id primitive.ObjectID) error {
    return s.repo.Delete(id)
}