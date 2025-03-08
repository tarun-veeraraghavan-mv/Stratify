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

	if err := db.DB.Where("user_id = ?", id).First(&courses).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "unable to fetch a course for the user",
		})
	}

	c.JSON(http.StatusOK, courses)
}