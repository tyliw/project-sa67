package config

import (
	"fmt"
	"project-sa67/entity/payment"
    "time"
)

func SetupPaymentDatabase() {
	db.AutoMigrate(
        &entity.Payment{},
	)

    payment := entity.Payment{
        PaymentID:     1,
        BookingID:     1,
        TotalAmount:   500,
        PaymentDate:   time.Now(),
        PaymentMethod: "Credit Card",
        Status:        "Pending",
    }
    db.Create(&payment)

    fmt.Println("PAYMENT data has been added to the database.")
}