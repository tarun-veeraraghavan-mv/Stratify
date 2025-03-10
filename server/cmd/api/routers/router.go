package routers

import (
	"server/cmd/api/controllers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000", "http://stratify-azure.vercel.app"}, // React frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // Allow cookies & JWT in headers
		MaxAge:           12 * time.Hour,
	}))

	router.POST("/api/v1/users", controllers.CreateUser)
	router.GET("/api/v1/users", controllers.GetAllUsers)
	router.GET("/api/v1/users/byId/:id", controllers.GetUserById)
	router.GET("/api/v1/users/byEmail/:email", controllers.GetUserByEmail)

	router.GET("/api/v1/users/:id/profile", controllers.GetProfileForUser)
	router.POST("/api/v1/profile", controllers.CreateProfile)

	router.POST("/api/v1/course", controllers.CreateCourse)
	router.GET("/api/v1/users/:id/course", controllers.GetCoursesForUser)
	router.DELETE("/api/v1/course/:id", controllers.DeleteCourse)

	router.POST("/api/v1/todo", controllers.CreateTodo)
	router.GET("/api/v1/users/:id/todo", controllers.GetTodosForUser)
	router.PATCH("/api/v1/todo/:id", controllers.MarkTodoCompleted)
	router.DELETE("/api/v1/todo/:id", controllers.DeleteTodo)

	router.POST("/api/v1/contact", controllers.CreateContact)
	router.GET("/api/v1/contact/:id", controllers.GetContactForUser)
	router.DELETE("/api/v1/contact/:id", controllers.DeleteContact)

	return router
}	