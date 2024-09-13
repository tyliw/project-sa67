package entity
	import (
	"gorm.io/gorm"
	"project-sa67/entity/room"
	"time"
)

type Payment struct {
	gorm.Model
	PaymentID int `gorm:"primaryKey;not null"`
	BookingID int `gorm:"index;not null"` // Foreign key
	Booking entity.Booking `gorm:"foreignKey:BookingID"` // Association
	TotalAmount float32 `gorm:"not null"`
	PaymentDate time.Time `gorm:"not null"`
	PaymentMethod string `gorm:"not null"`
	Status string `gorm:"not null"`
}