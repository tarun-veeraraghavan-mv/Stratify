package models

type Course struct {
	ID uint `json:"id" gorm:"primaryKey;autoIncrement"` 
  SemesterNumber int `json:"semesterNumber"`
  Name string `json:"name"`
  ProffessorName string `json:"proffessorName"`
  Desc string `json:"desc"`
  StartDate string `json:"startDate"`
  EndDate string `json:"endDate"`
  StartTime string `json:"startTime"`
  EndTime string `json:"endTime"`
  Progress string `json:"progress"`
  Grade int `json:"grade"`
  Difficulty string `json:"difficulty"`
  SemesterColor string `json:"semesterColor"`
	UserId uint `json:"user_id"`
	User User `json:"-" gorm:"foreignKey:UserId;references:ID"`
}