package controllers

import (
	"net/http"
	"server/cmd/api/models"
	"server/internals/db"

	"github.com/gin-gonic/gin"
)

func CreateCourse(c *gin.Context) {
	var course models.Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	if err := db.DB.Create(&course).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "course created",
		"course": course,
	})
}

func GetCoursesForUser(c *gin.Context) {
	var courses []models.Course

	id := c.Param("id")

	if err := db.DB.Where("user_id = ?", id).Find(&courses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to fetch courses for the user"})
		return
	}

	c.JSON(http.StatusOK, courses)
}

func DeleteCourse(c *gin.Context) {
	var course models.Course
	id := c.Param("id")

	// First, delete associated todos
	if err := db.DB.Where("course_id = ?", id).Delete(&models.Todo{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Unable to delete associated todos",
		})
		return
	}	


	if err := db.DB.First(&course, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to fetch todos for this user",
		})
		return
	}

	if err := db.DB.Delete(&course).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Course deleted successfully"})
}
