package dto

import "gitlab.com/eescarria/ecommerce-equipo4.git/internal/domain/models"

type ProductWithSubCategory struct {
	models.Product
	SubCategoryName string `json:"subCategoryName"`
}