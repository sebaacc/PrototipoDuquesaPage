package services_implement

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"mime/multipart"
	"path/filepath"

	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/repositories"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type categoryService struct {
	categoryRepo    repositories.CategoryRepository
	subCategoryService services.SubCategoryService
}

func NewCategoryService(categoryRepo repositories.CategoryRepository, subCategoryService services.SubCategoryService) services.CategoryService {
	return &categoryService{
		categoryRepo:    categoryRepo,
		subCategoryService: subCategoryService,
	}
}


// func (s *categoryService) CreateCategory(category *models.Category, file *multipart.FileHeader) error {
//     category.ID = primitive.NewObjectID()

//     // Generar un nombre único para el archivo
//     filename := fmt.Sprintf("category_%d%s", rand.Int63(), filepath.Ext(file.Filename))
//     fmt.Println("Nombre del archivo generado:", filename)

//     // Guardar el archivo en el sistema de archivos local
//     // uploadPath := "C:/Users/felip/Desktop/CTD/Segundo año/ProyectoIntegrador/ecommerce-equipo4/Images/" + filename
//     uploadPath := "D:/Seba/weas/Documentso/Estudios/PROGRAMACION/DigitalHouse/Segundo/integrador/proyecto/ecommerce-equipo4/Images/" + filename

//     fmt.Println("Ruta de guardado:", uploadPath)
//     err := utils.SaveFileToSystem(file, uploadPath)
//     if err != nil {
//         fmt.Println("Error al guardar el archivo:", err)
//         return err
//     }

//     // Asignar la URL de la imagen al campo CategoryImage
//     category.CategoryImage = "http://localhost:8000/" + filename
//     fmt.Println("URL de la imagen:", category.CategoryImage)

//     fmt.Println("Categoría a crear:", category)
//     err = s.categoryRepo.Create(category)
//     if err != nil {
//         fmt.Println("Error al crear la categoría en service:", err)
//         return err
//     }

//     return nil
// }

func (s *categoryService) CreateCategory(category *models.Category, file *multipart.FileHeader) error {
	category.ID = primitive.NewObjectID()

	// Generar un nombre único para el archivo
	filename := fmt.Sprintf("category_%d%s", rand.Int63(), filepath.Ext(file.Filename))
	fmt.Println("Nombre del archivo generado:", filename)

	// Leer el archivo
	fileContent, err := file.Open()
	if err != nil {
		return err
	}
	defer fileContent.Close()

	fileBytes, err := ioutil.ReadAll(fileContent)
	if err != nil {
		return err
	}

	// Subir el archivo a S3
	err = utils.UploadFileToS3(filename, fileBytes)
	if err != nil {
		fmt.Println("Error al subir el archivo a S3:", err)
		return err
	}

	category.CategoryImage = utils.GeneratePresignedURL(filename)
    fmt.Println("URL de la imagen:", category.CategoryImage)

	/*
	// Asignar la URL de la imagen al campo CategoryImage
	category.CategoryImage, err = utils.GeneratePresignedURL(filename)
	if err != nil {
		fmt.Println("Error al generar la URL presignada:", err)
		return err
	}

	fmt.Println("URL de la imagen:", category.CategoryImage)
*/
	fmt.Println("Categoría a crear:", category)
	err = s.categoryRepo.Create(category)
	if err != nil {
		fmt.Println("Error al crear la categoría en service:", err)
		return err
	}

	return nil
}

func (s *categoryService) GetCategoryByID(id primitive.ObjectID) (*models.Category, error) {
    fmt.Println("holaaaaa")
    fmt.Println(s.categoryRepo.GetByID(id))
    return s.categoryRepo.GetByID(id)
}

func (s *categoryService) GetAllCategories() ([]*models.Category, error) {
    return s.categoryRepo.GetAll()
}

func (s *categoryService) UpdateCategory(category *models.Category) error {
    return s.categoryRepo.Update(category)
}

func (s *categoryService) DeleteCategory(id primitive.ObjectID) error {

    err := s.subCategoryService.DeleteSubCategoryByCategoryId(id)
	if err != nil {
		return err
	}

    return s.categoryRepo.Delete(id)
}