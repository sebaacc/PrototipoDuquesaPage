package services_implement

import (
	"math/rand"
	"fmt"
	"mime/multipart"
	"path/filepath"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type subCategoryService struct {
    repo repositories.SubCategoryRepository
}

func NewSubCategoryService(repo repositories.SubCategoryRepository) services.SubCategoryService {
    return &subCategoryService{repo}
}

func (s *subCategoryService) CreateSubCategory(subCategory *models.SubCategory, file *multipart.FileHeader) error {
    subCategory.ID = primitive.NewObjectID()

    // Generar un nombre único para el archivo
    filename := fmt.Sprintf("subcategory_%d%s", rand.Int63(), filepath.Ext(file.Filename))
    fmt.Println("Nombre del archivo generado:", filename)

    // Guardar el archivo en el sistema de archivos local
    uploadPath := "C:/Users/felip/Desktop/CTD/Segundo año/ProyectoIntegrador/ecommerce-equipo4/Images/" + filename

    fmt.Println("Ruta de guardado:", uploadPath)
    err := utils.SaveFileToSystem(file, uploadPath)
    if err != nil {
        fmt.Println("Error al guardar el archivo:", err)
        return err
    }

    // Asignar la URL de la imagen al campo SubCategoryImage
    subCategory.SubCategoryImage = "http://localhost:8000/" + filename
    fmt.Println("URL de la imagen:", subCategory.SubCategoryImage)

    fmt.Println("SubCategoría a crear:", subCategory)
    err = s.repo.Create(subCategory)
    if err != nil {
        fmt.Println("Error al crear la subcategoría en service:", err)
        return err
    }

    return nil
}

func (s *subCategoryService) GetSubCategoryByID(id primitive.ObjectID) (*models.SubCategory, error) {
    return s.repo.GetByID(id)
}

func (s *subCategoryService) GetAllSubCategories() ([]*models.SubCategory, error) {
    return s.repo.GetAll()
}

func (s *subCategoryService) UpdateSubCategory(subCategory *models.SubCategory) error {
    return s.repo.Update(subCategory)
}

func (s *subCategoryService) DeleteSubCategory(id primitive.ObjectID) error {
    return s.repo.Delete(id)
}
	