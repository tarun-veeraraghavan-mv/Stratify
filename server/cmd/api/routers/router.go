package routers

import (
	"server/cmd/api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.POST("/api/v1/users", controllers.CreateUser)
	router.GET("/api/v1/users", controllers.GetAllUsers)
	router.GET("/api/v1/users/:id", controllers.GetUserById)

	router.GET("/api/v1/users/:id/profile", controllers.GetProfileForUser)
	router.POST("/api/v1/profile", controllers.CreateProfile)

	router.POST("/api/v1/course", controllers.CreateCourse)
	router.GET("/api/v1/users/:id/course", controllers.GetCoursesForUser)

	return router
}	