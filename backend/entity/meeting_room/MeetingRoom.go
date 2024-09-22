package entity

import "gorm.io/gorm"

type MeetingRoom struct{
	gorm.Model
	RoomName string
	Capacity int
	Detail string
	RoomSize float64
	AirCondition int
	Chair int
	Type string
	Image string `gorm:"type:longtext"`
	Customers []CustomerMeetingRoom `gorm:"many2many:ManageRoom;"`
}
