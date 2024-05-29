package routes

import (
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/services"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/handlers"
	"github.com/gin-gonic/gin"
)

func SubCategoryRoutes(r *gin.Engine, subCategoryService services.SubCategoryService) {

	subCategoryHandler := handlers.NewSubCategoryHandler(subCategoryService)
	subCategoryRoute := "/subCategory"

	r.GET(subCategoryRoute+"/findAllSubCategories", subCategoryHandler.FindAll())
	r.GET(subCategoryRoute+"/findSubCategoryById/:id", subCategoryHandler.FindById())
	r.POST(subCategoryRoute+"/createSubCategory", subCategoryHandler.Post())
	r.PUT(subCategoryRoute+"/updateSubCategory/:id", subCategoryHandler.Put())
	r.DELETE(subCategoryRoute+"/deleteSubCategory/:id",subCategoryHandler.Delete())
	
}