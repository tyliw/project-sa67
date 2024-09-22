package meeting_room

import (
	"project-sa67/config"
	"project-sa67/entity/meeting_room"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /ManageRoom
func CreateBookingMeetingRoom(c *gin.Context) {
	var manageRoom entity.ManageRoom

	// Bind the JSON payload to the ManageRoom struct
	if err := c.ShouldBindJSON(&manageRoom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get a database connection
	db := config.DB()

	// Fetch the Customer by ID
	var customer entity.CustomerMeetingRoom
	if err := db.First(&customer, manageRoom.CustomerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	// Fetch the MeetingRoom by ID
	var meetingRoom entity.MeetingRoom
	if err := db.First(&meetingRoom, manageRoom.MeetingRoomID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meeting Room not found"})
		return
	}
	var duration entity.Duration
	if err := db.First(&duration, manageRoom.DurationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meeting Room not found"})
		return
	}

	// Create a new ManageRoom record
	b := entity.ManageRoom{
		DateTime: 	   manageRoom.DateTime,	
		TotalPeople:   manageRoom.TotalPeople,
		CustomerID:    manageRoom.CustomerID,
		Customer:      customer,
		DurationID:    duration.ID,
		MeetingRoomID: manageRoom.MeetingRoomID,
		MeetingRoom:   meetingRoom,
	}

	// Insert the new record into the database
	if err := db.Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Return a success response
	c.JSON(http.StatusCreated, gin.H{"message": "Created successfully", "data": b})
}



// GET /Booking/:id
func GetBookingMeetingRoom(c *gin.Context) {
	ID := c.Param("id")
	var booking entity.ManageRoom

	db := config.DB()
	results := db.First(&booking, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if booking.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, booking)
}



// GET /Bookings
func ListBookingMeetingRoom(c *gin.Context) {

	var manageRoom []entity.ManageRoom

	db := config.DB()

	db.Find(&manageRoom)

	c.JSON(http.StatusOK, &manageRoom)
}


// DELETE /Booking/:id
func DeleteBookingMeetingRoom(c *gin.Context) {

	id := c.Param("id")
    db := config.DB()

    result := db.Delete(&entity.ManageRoom{}, id)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "An unexpected error occurred"})
        return
    }
    if result.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking meeting room with the specified ID not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Booking meeting room deleted successfully"})

}

func GetBookingByMeetingRoomByID(c *gin.Context) {

    id := c.Param("id")
	// dateTime := c.Query("date_time") 
    db := config.DB()

    var bookings []struct {
        DateTime string `json:"DateTime"`
        StartTime string `json:"StartTime"`
        EndTime string `json:"EndTime"`
    }

    if tx := db.Table("manage_rooms").Where("meeting_room_id = ? ", id).Find(&bookings); tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query failed"})
        return
    } else if tx.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "No bookings found for the given meeting room ID and DateTime"})
        return
    }
    c.JSON(http.StatusOK, bookings)
}


// PATCH /Booking
func UpdateBookingMeetingRoom(c *gin.Context) {
	var booking entity.ManageRoom
	BookingID := c.Param("id")
	db := config.DB()
	result := db.First(&booking, BookingID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&booking)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
