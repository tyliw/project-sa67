package config

import (
	"project-sa67/entity/meeting_room"
)

func SetupMeetingRoomDatabase() {
	db.AutoMigrate(
		&entity.MeetingRoom{},
		&entity.CustomerMeetingRoom{},
		&entity.ManageRoom{},
		&entity.Duration{},
	)

	duration1 := &entity.Duration{
		StartTime:"08:00",
		EndTime:"12:00",
	}
	duration2 := &entity.Duration{
		StartTime:"13:00",
		EndTime:"16:00",
	}
	duration3 := &entity.Duration{
		StartTime:"18:00",
		EndTime:"22:00",
	}
	db.FirstOrCreate(&duration1, entity.Duration{
		StartTime:"08:00",
		EndTime:"12:00",
	})
	db.FirstOrCreate(&duration2, entity.Duration{
		StartTime:"13:00",
		EndTime:"16:00",
	})
	db.FirstOrCreate(&duration3, entity.Duration{
		StartTime:"18:00",
		EndTime:"22:00",
	})
	
	

	rooms := []entity.MeetingRoom{
		{
			RoomName:     "Board Room 1",
			Capacity:     30,
			Detail:       "A small board room with video conferencing facilities.",
			RoomSize:     35.0,
			AirCondition: 1,
			Chair:        30,
			Image:        "https://www.cinnamon-residence.com/wp-content/uploads/2019/08/MyTea_02.jpg",
			Type:         "Boardroom",
		},
		{
			RoomName:     "Training Room",
			Capacity:     50,
			Detail:       "An interactive training room with whiteboards and projectors.",
			RoomSize:     80.0,
			AirCondition: 1,
			Chair:        50,
			Image:        "https://www.thecontinenthotel.com/wp-content/uploads/2024/04/GMT-at-The-Continent-Hotel-Sukhumvit-Asok-BTS-Bangkok-by-Compass-Hospitality-7.webp",
			Type:         "Training",
		},
		{
			RoomName:     "Conference Room B",
			Capacity:     80,
			Detail:       "A large conference room suitable for big meetings.",
			RoomSize:     100.0,
			AirCondition: 1,
			Chair:        80,
			Image:        "https://www.midaresortkanchanaburi.com/wp-content/uploads/2022/03/Midas-Meeting-Room_37.jpg",
			Type:         "Conference",
		},
		{
			RoomName:     "Executive Room",
			Capacity:     20,
			Detail:       "An exclusive room for executive meetings.",
			RoomSize:     30.0,
			AirCondition: 1,
			Chair:        20,
			Image:        "https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid",
			Type:         "Executive",
		},
		{
			RoomName:     "Strategy Room",
			Capacity:     40,
			Detail:       "A room designed for strategic planning sessions.",
			RoomSize:     60.0,
			AirCondition: 1,
			Chair:        40,
			Image:        "https://i.pinimg.com/originals/2c/92/62/2c92623cb344f1d836bf0537cbe62bd9.jpg",
			Type:         "Strategy",
		},
		{
			RoomName:     "Workshop Room",
			Capacity:     70,
			Detail:       "A flexible room for workshops and hands-on sessions.",
			RoomSize:     120.0,
			AirCondition: 1,
			Chair:        70,
			Image:        "https://image-tc.galaxy.tf/wijpeg-6auralk8b4mkv3ch6jgfqt5wm/autumn-meeting-5.jpg?width=1920",
			Type:         "Workshop",
		},
		{
			RoomName:     "Seminar Hall",
			Capacity:     150,
			Detail:       "A spacious hall for large seminars and events.",
			RoomSize:     250.0,
			AirCondition: 1,
			Chair:        150,
			Image:        "https://image-tc.galaxy.tf/wijpeg-5mmwyqf58fpj7fin2ubgznbv4/spring-ballroom-13.jpg?width=1920",
			Type:         "Seminar",
		},
		{
			RoomName:     "Creative Room",
			Capacity:     30,
			Detail:       "A creative space designed for brainstorming and collaboration.",
			RoomSize:     50.0,
			AirCondition: 1,
			Chair:        30,
			Image:        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFBh9UNhU9GrRqYCOgZQ6oLtYjb39C-5MTA&s",
			Type:         "Creative",
		},
		{
			RoomName:     "VIP Room",
			Capacity:     12,
			Detail:       "A private room for VIP meetings.",
			RoomSize:     25.0,
			AirCondition: 1,
			Chair:        12,
			Image:        "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/CKK352GGQ5NHHPY6UWXYAMR6AA.jpg",
			Type:         "VIP",
		},
	}
	
	// Insert each room into the database
	for _, room := range rooms {
		db.FirstOrCreate(&room, entity.MeetingRoom{RoomName: room.RoomName})
	}
	

}