package models

type Profile struct {
	ID uint `json:"id" gorm:"primaryKey;autoIncrement"` 
	DateOfBirth string `json:"dateOfBirth"`
	Gender string `json:"gender"`
  Location string `json:"location"`
  CurrentCollege string `json:"currentCollege"`
  Major string `json:"major"`
  Minor string `json:"minor"`
	UserId uint `json:"user_id"`
	User User `json:"-" gorm:"foreignKey:UserId;references:ID"`
}