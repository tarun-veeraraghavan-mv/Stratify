package models

type Contact struct {
	ID uint `json:"id"`
	Name string `json:"name"`
	Role string	`json:"role"`
	Email string	`json:"email"`
	Phone string	`json:"phone"`
	BirthDate string	`json:"birthDate"`
	UserId uint `json:"user_id" gorm:"not null;constraint:OnDelete:CASCADE;"`
	User User `json:"-" gorm:"foreignKey:UserId;references:ID"`
}