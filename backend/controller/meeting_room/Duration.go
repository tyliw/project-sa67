package meeting_room

import (
	"project-sa67/config"
	"project-sa67/entity/meeting_room"
	"net/http"

	"github.com/gin-gonic/gin"
	"fmt"
	"time"
)


// GET /Duration/:id
func GetDurationByBookingID(c *gin.Context) {
    dateTimeStr := c.Query("date_time") // Get the date_time parameter from the query
    id := c.Param("id") // Get the meeting room ID from the URL parameter

    // Log the received id
    fmt.Println("Received meeting room ID:", id) // Debug log
    fmt.Println("Received date_time:", dateTimeStr) // Debug log

    // Parse the date_time string to time.Time
    dateTime, err := time.Parse(time.RFC3339, dateTimeStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date_time format"})
        return
    }

    db := config.DB() 
    var durations []entity.Duration

    // Prepare the query
    query := db.Table("durations").
        Select("durations.*").
        Joins("LEFT JOIN manage_rooms ON durations.ID = manage_rooms.duration_id AND manage_rooms.meeting_room_id = ? AND manage_rooms.date_time = ? AND manage_rooms.deleted_at IS NULL", id, dateTime).
        Where("manage_rooms.duration_id IS NULL")

    // Execute the query
    if err := query.Scan(&durations).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Check if any durations were found
    if len(durations) == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    // Respond with the durations
    c.JSON(http.StatusOK, durations)
}





// GET /Bookings
func ListDuration(c *gin.Context) {

	var duration []entity.Duration

	db := config.DB()

	db.Find(&duration)

	c.JSON(http.StatusOK, &duration)
}

