package models

type Todo struct {
	ID uint `json:"id" gorm:"primaryKey;autoIncrement"` 
	Name string
	DueDate string
}