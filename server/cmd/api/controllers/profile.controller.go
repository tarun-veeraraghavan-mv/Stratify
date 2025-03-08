package controllers

import (
	"net/http"
	"server/cmd/api/models"
	"server/internals/db"

	"github.com/gin-gonic/gin"
)

func CreateProfile(c *gin.Context) {
	var profile models.Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "fail",
			"message": "invalid request body",
		})
		return
	}

	if err := db.DB.Create(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "profile created",
		"profile": profile,
	})
}

func GetProfileForUser(c *gin.Context) {
	var profile models.Profile

	id := c.Param("id")

	if err := db.DB.Where("user_id = ?", id).First(&profile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "unable to fetch a profile for this user",
		})
		return
	}

	c.JSON(http.StatusOK, profile)
}