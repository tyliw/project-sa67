package config

import (
	"fmt"
	"project-sa67/entity/room"
	"time"
)

func SetupRoomDatabase() {
	db.AutoMigrate(
		&entity.Booking{},
		&entity.Customer{},
		&entity.Room{},
		&entity.RoomRank{},
		&entity.RoomTypes{},
		&entity.RoomTypesRoomRank{},
	)

	// Seed RoomTypes
	singleRoom := entity.RoomTypes{Name: "Single", PricePerNight: 100, HowLongTime: 24, PaymentMethod: "Credit", Description: "Single bed room"}
	doubleRoom := entity.RoomTypes{Name: "Double", PricePerNight: 150, HowLongTime: 24, PaymentMethod: "Credit", Description: "Double bed room"}
	suiteRoom := entity.RoomTypes{Name: "Suite", PricePerNight: 250, HowLongTime: 24, PaymentMethod: "Credit", Description: "Suite room with premium amenities"}

	db.FirstOrCreate(&singleRoom)
	db.FirstOrCreate(&doubleRoom)
	db.FirstOrCreate(&suiteRoom)

	// Seed RoomRanks
	standardRank := entity.RoomRank{Name: "Standard", NumberPerRank: 1, Description: "Standard rank room"}
	deluxeRank := entity.RoomRank{Name: "Deluxe", NumberPerRank: 2, Description: "Deluxe rank room with better amenities"}

	db.FirstOrCreate(&standardRank)
	db.FirstOrCreate(&deluxeRank)

	// Seed RoomTypesRoomRank associations
	roomTypeRoomRank1 := entity.RoomTypesRoomRank{RoomRankID: &standardRank.ID, RoomTypesID: &singleRoom.ID}
	roomTypeRoomRank2 := entity.RoomTypesRoomRank{RoomRankID: &deluxeRank.ID, RoomTypesID: &suiteRoom.ID}

	db.FirstOrCreate(&roomTypeRoomRank1)
	db.FirstOrCreate(&roomTypeRoomRank2)

	// Seed Rooms
	room1 := entity.Room{Status: "Available", Address: "101A", TotalPrice: 100, RoomTypesID: &singleRoom.ID}
	room2 := entity.Room{Status: "Booked", Address: "102A", TotalPrice: 150, RoomTypesID: &doubleRoom.ID}
	room3 := entity.Room{Status: "Available", Address: "201A", TotalPrice: 250, RoomTypesID: &suiteRoom.ID}

	db.Create(&room1)
	db.Create(&room2)
	db.Create(&room3)

	// Seed Customers
	customer1 := entity.Customer{Name: "John Doe", Address: "123 Main St", PhoneNumber: "555-1234", Email: "johndoe@example.com", PaymentMethod: "Credit Card"}
	customer2 := entity.Customer{Name: "Jane Doe", Address: "456 Main St", PhoneNumber: "555-5678", Email: "janedoe@example.com", PaymentMethod: "Cash"}

	db.FirstOrCreate(&customer1)
	db.FirstOrCreate(&customer2)

	// Seed Bookings
	booking1 := entity.Booking{CheckIn: time.Now(), CustomerID: &customer1.ID, RoomID: &room1.ID}
	booking2 := entity.Booking{CheckIn: time.Now(), CustomerID: &customer2.ID, RoomID: &room2.ID}

	db.Create(&booking1)
	db.Create(&booking2)

	fmt.Println("ROOM data has been added to the database.")
}