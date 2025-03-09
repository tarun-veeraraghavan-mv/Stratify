package db

import (
	"fmt"
	"server/cmd/api/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "postgresql://postgres.rudaffsevvmlmjnsamnm:QJgtJ1IwihNaysWC@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to Supabase!")
	}

	err = db.AutoMigrate(
		&models.User{}, 
		&models.Profile{}, 
		&models.Course{},
		&models.Todo{})
	if err != nil {
		panic("error migrating database: " + err.Error())
	}

	fmt.Println("Connected to Supabase")
	DB = db
}