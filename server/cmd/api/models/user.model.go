package models

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey;autoIncrement"` 
	Name     string `json:"name" `
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
}