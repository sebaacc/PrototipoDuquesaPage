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
    subCategoryRepo repositories.SubCategoryRepository
    productRepo     repositories.ProductRepository
}

func NewSubCategoryService(subCategoryRepo repositories.SubCategoryRepository, productRepo repositories.ProductRepository) services.SubCategoryService {
    return &subCategoryService{
        subCategoryRepo: subCategoryRepo,
        productRepo:     productRepo,
    }
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
    err = s.subCategoryRepo.Create(subCategory)
    if err != nil {
        fmt.Println("Error al crear la subcategoría en service:", err)
        return err
    }

    return nil
}

func (s *subCategoryService) GetSubCategoryByID(id primitive.ObjectID) (*models.SubCategory, error) {
    return s.subCategoryRepo.GetByID(id)
}

func (s *subCategoryService) GetAllSubCategories() ([]*models.SubCategory, error) {
    return s.subCategoryRepo.GetAll()
}

func (s *subCategoryService) UpdateSubCategory(subCategory *models.SubCategory) error {
    return s.subCategoryRepo.Update(subCategory)
}

func (s *subCategoryService) DeleteSubCategory(id primitive.ObjectID) error {

    err := s.productRepo.DeleteBySubCategoryID(id)
    if err != nil {
        return err
    }

    return s.subCategoryRepo.Delete(id)
}



func (s *subCategoryService) DeleteSubCategoryByCategoryId(categoryID primitive.ObjectID) error {
    // Obtener todos los IDs de las subcategorías asociadas a la categoría
    subCategories, err := s.subCategoryRepo.FindManyByCategoryID(categoryID)
    if err != nil {
        return err
    }

    // Eliminar productos asociados a cada subcategoría
    for _, subCategory := range subCategories {
        err := s.productRepo.DeleteBySubCategoryID(subCategory.ID)
        if err != nil {
            return err
        }
    }

    // Eliminar las subcategorías por el ID de la categoría
    err = s.subCategoryRepo.DeleteByCategoryID(categoryID)
    if err != nil {
        return err
    }

    return nil
}


