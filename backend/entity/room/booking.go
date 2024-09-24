package entity

import (
	entity "project-sa67/entity/employee"
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	CheckIn  time.Time
	CheckOut time.Time
	TotalPrice float32 `gorm:"default:0.01"`

	// CreatorID ทำหน้าที่เป็น FK
	CustomerID *uint
	Customer   Customer `gorm:"foreignKey:CustomerID"`

	// CreatorID ทำหน้าที่เป็น FK
	RoomID *uint
	Room   Room `gorm:"foreignKey:RoomID"`

	EmployeeID uint
	Employee   entity.Employee `gorm:"foreignKey:EmployeeID"`

	// 1 sound เป็นเจ้าของได้หลาย SoundPlaylists
	//Bookings []Booking `gorm:"foreignKey:SoundID"`
}
