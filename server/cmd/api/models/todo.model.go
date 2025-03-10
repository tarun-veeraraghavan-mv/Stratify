package models

type Todo struct {
	ID uint `json:"id" gorm:"primaryKey;autoIncrement"` 
	Name string `json:"name"`
	DueDate string `json:"dueDate"`
	Progress string `json:"progress"`
	Priority string `json:"priority"`
	Remarks string `json:"remarks"`
	Completed bool `json:"completed"`
	CourseId uint `json:"course_id" gorm:"not null;constraint:OnDelete:CASCADE;"`
	Course Course `json:"-" gorm:"foreignKey:CourseId;references:ID"`
	UserId uint `json:"user_id"`
	User User `json:"-" gorm:"foreignKey:UserId;references:ID"`
}