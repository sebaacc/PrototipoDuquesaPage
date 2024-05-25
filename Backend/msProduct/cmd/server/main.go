package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab.com/eescarria/ecommerce-equipo4.git/internal/insfraestructure/data"
)

func main() {

    r := gin.Default() 

    r.GET("/", func(c *gin.Context) {
        c.String(http.StatusOK, "Welcome to IslaBaru!")
    })


    data.ConnectDB()


    log.Println("Application started successfully!")

    r.Run(":8080")

}
