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
    fmt.Println("Received date_time:", dateTimeStr) // Debug log

    dateTime, err := time.Parse(time.RFC3339, dateTimeStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date_time format"})
        return
    }

    db := config.DB() 
	var durations []entity.Duration
    err = db.Table("durations").
    Select("*").
    Joins("LEFT JOIN manage_rooms ON durations.ID = manage_rooms.duration_id AND manage_rooms.date_time = ? AND manage_rooms.deleted_at IS NULL", dateTime).
    Where("manage_rooms.date_time IS NULL").
    Find(&durations).Error

	

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if len(durations) == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    c.JSON(http.StatusOK, durations)
}



// GET /Bookings
func ListDuration(c *gin.Context) {

	var duration []entity.Duration

	db := config.DB()

	db.Find(&duration)

	c.JSON(http.StatusOK, &duration)
}

