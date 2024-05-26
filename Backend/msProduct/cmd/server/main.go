package main

import (
	"log"
	"github.com/gin-gonic/gin"
	repositories_implement "gitlab.com/eescarria/ecommerce-equipo4.git/internal/app/repositories_implements"
	services_implement "gitlab.com/eescarria/ecommerce-equipo4.git/internal/app/service_implements"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/data"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/routes"
)

func main() {

	r := gin.Default()

	db, err := data.ConnectToMongoDB()
	if err != nil {
		log.Fatal(err)
	}

	// MongoDB es una base de datos NoSQL documental, no requiere definir un esquema rígido
	// ni realizar migraciones como en bases de datos relacionales. Las colecciones se crean
	// automáticamente al insertar documentos, por lo que no se requiere el db.automigrate

	//Inicialización de repository en base a la bd configurada en data
	categoryRepository := repositories_implement.NewMongoCategoryRepository(db)
	subCategoryRepository := repositories_implement.NewMongoSubCategoryRepository(db)
	productRepository := repositories_implement.NewMongoProductRepository(db)
	productImagesRepository := repositories_implement.NewMongoProductImagesRepository(db)

	//Inicialización del servicio pasando los repo anteriores
	categoryService := services_implement.NewCategoryService(categoryRepository, subCategoryRepository)
	subCategoryService := services_implement.NewSubCategoryService(subCategoryRepository)
	productService := services_implement.NewProductService(productRepository)
	productImagesService := services_implement.NewProductImagesService(productImagesRepository)

	//Llamado a las rutas, que inicializan los handlers
	routes.CategoryRoutes(r, categoryService)
	routes.SubCategoryRoutes(r, subCategoryService)
	routes.ProductRoutes(r, productService)
	routes.ProductImagesRoutes(r, productImagesService)

	log.Println("Application started successfully!")

	r.Run(":8080")

}
