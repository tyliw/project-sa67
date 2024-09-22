package entity

import (
	"time"

	"gorm.io/gorm"
)

type ManageRoom struct{
	gorm.Model
	ID uint `gorm:"primaryKey"`
	DateTime time.Time
	TotalPeople int
	CustomerID    uint       // Foreign key to Customer
	Customer      CustomerMeetingRoom   `gorm:"foreignKey:CustomerID"` 

	DurationID uint
	
	MeetingRoomID uint       // Foreign key to MeetingRoom
	MeetingRoom   MeetingRoom `gorm:"foreignKey:MeetingRoomID"`
}


