package handlers

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab.com/eescarria/ecommerce-equipo4.git/pkg/utils"
)

func UploadVideoHandler(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	defer file.Close()

	fileName := header.Filename
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = utils.UploadFileToS3(fileName, fileBytes)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})
}

func GetVideoURLHandler(c *gin.Context) {
	fileName := c.Param("filename")

	url, err := utils.GeneratePresignedURL(fileName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": url})
}