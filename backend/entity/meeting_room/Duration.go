package entity

import (
	"gorm.io/gorm"
)

type Duration struct {
	gorm.Model
	StartTime string
	EndTime string
	ManageRooms  []ManageRoom `gorm:"foreignKey:DurationID"`  
}
