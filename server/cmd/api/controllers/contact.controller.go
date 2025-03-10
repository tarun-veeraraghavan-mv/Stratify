package controllers

import (
	"net/http"
	"server/cmd/api/models"
	"server/internals/db"

	"github.com/gin-gonic/gin"
)

func CreateContact(c *gin.Context) {
	var contact models.Contact
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	if err := db.DB.Create(&contact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "fail",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "contact created",
		"contact": contact,
	})
}

func GetContactForUser(c *gin.Context) {
	var contacts []models.Contact
	id := c.Param("id")

	if err := db.DB.Where("user_id = ?", id).Find(&contacts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to fetch contacts for the user"})
		return
	}

	c.JSON(http.StatusOK, contacts)
}

func DeleteContact(c *gin.Context) {
	var contact models.Contact
	id := c.Param("id")

	if err := db.DB.First(&contact, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to fetch contact for this user",
		})
		return
	}

	if err := db.DB.Delete(&contact).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete contact"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Contact deleted successfully"})
}