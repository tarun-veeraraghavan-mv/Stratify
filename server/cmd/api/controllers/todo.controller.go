package controllers

import (
	"net/http"
	"server/cmd/api/models"
	"server/internals/db"

	"github.com/gin-gonic/gin"
)

func CreateTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	if err := db.DB.Create(&todo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "todo created",
		"todo": todo,
	})
}

func GetTodosForUser(c *gin.Context) {
	var todos []models.Todo
	id := c.Param("id")

	if err := db.DB.Where("user_id = ?", id).Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to fetch todos for the user"})
		return
	}

	c.JSON(http.StatusOK, todos)
}

func DeleteTodo(c *gin.Context) {
	var todo models.Todo
	id := c.Param("id")

	if err := db.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to fetch todos for this user",
		})
		return
	}

	if err := db.DB.Delete(&todo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todo"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}

func MarkTodoCompleted(c *gin.Context) {
	var todo models.Todo
	id := c.Param("id")
	if err := db.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := db.DB.Model(&todo).Update("completed", true).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update todo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Todo marked as completed", "todo": todo})
}