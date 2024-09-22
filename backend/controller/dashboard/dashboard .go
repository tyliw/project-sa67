package dashboard

import (
	"net/http"

	// "project-sa67/entity"
	"project-sa67/config"

	"github.com/gin-gonic/gin"
)

func GetMostPurchasedMenu(c *gin.Context) {

    // โครงสร้างข้อมูลที่ส่งกลับ
    type MenuSummary struct {
        MenuID      uint
        MenuList    string
        Price       float32
        Description string
        ImageMenu   string
        TotalAmount int
    }

    var menu MenuSummary

    db := config.DB()
    results := db.Table("orders").
        Select("menus.id AS menu_id, menus.menu_list, menus.price, menus.description, menus.image_menu, SUM(orders.amount) AS total_amount").
        Joins("JOIN bookings ON bookings.id = orders.booking_id").
        Joins("JOIN payments ON payments.booking_id = bookings.id").
        Joins("JOIN menus ON menus.id = orders.menu_id").
        Group("menus.id").
        Order("total_amount DESC").
        Limit(1).
        Scan(&menu)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, menu)
}

func ListOrdersPerDay(c *gin.Context) {

    type OrderSummary struct {
        OrderDay   string  `json:"order_day"`
        TotalPrice float32 `json:"total_price"`
        Amount int `json:"amount"`
    }

    var orders []OrderSummary

    db := config.DB()
    results := db.Table("orders").
        Select("DATE(order_date) AS order_day, SUM(amount) AS amount,SUM(price) AS total_price").
        Group("DATE(order_date)").
        Order("order_day").
        Scan(&orders)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, orders)
}

func ListBookingPricePerDay(c *gin.Context) {

    type BookingPriceSummary struct {
        Day   string  `json:"day"`
        TotalPrice float32 `json:"total_price"`
    }

    var bookingPrice []BookingPriceSummary

    db := config.DB()
    results := db.Table("bookings").
        Select("DATE(check_in) AS day,SUM(total_price) AS total_price").
        Group("DATE(check_in)").
        Order("day").
        Scan(&bookingPrice)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, bookingPrice)
}



func ListPeoplePerDay(c *gin.Context) {

    type PeopleAll struct {
        Day   string  
        Total int 
    }

    var people []PeopleAll

    db := config.DB()
    results := db.Table("bookings").
    Select("DATE(bookings.check_in) AS Day, SUM(room_types.id) AS Total").
    Joins("INNER JOIN rooms ON bookings.room_id = rooms.id").
    Joins("INNER JOIN room_types ON rooms.room_types_id = room_types.id").
    Group("DATE(bookings.check_in)").
    Order("Day").
    Scan(&people)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, people)
}


func ListRoomsPerDay(c *gin.Context) {
    type BookingSummary struct {
        CheckInDate string
        Count       int
    }
    var bookingSummary []BookingSummary
    db := config.DB()
    results :=  db.Table("bookings").
    Select("DATE(check_in) AS check_in_date, COUNT(*) AS count").
    Group("DATE(check_in)").
    Scan(&bookingSummary)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, bookingSummary)
}

func ListPaymentsPerDay(c *gin.Context) {

    type PaymentSummary struct {
        PaymentDay string
        TotalAmount  float64
    }

    var paymentSummary []PaymentSummary
    db := config.DB()
    results :=  db.Table("payments").
        Select("DATE(payment_date) AS PaymentDay, SUM(total_amount) AS TotalAmount").
        Group("Date(payment_date)").
        Scan(&paymentSummary)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, paymentSummary)
}

func ListManageRoomsPerDate(c *gin.Context) {
    db := config.DB() // การเชื่อมต่อฐานข้อมูล

    type ManageRoomByDate struct {
        Date         string `json:"date"`
        TotalBookings int64  `json:"total_bookings"`
    }

    var results []ManageRoomByDate
    err := db.Table("manage_rooms").
        Select("DATE(date_time) as date, COUNT(*) as total_bookings").
        Group("DATE(date_time)"). // จัดกลุ่มตามวันที่
        Scan(&results).Error

    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, results)
}



func ListPaymentsPerMonth(c *gin.Context) {

    type paymentSummaries struct {
        PaymentMonth string
        TotalAmount  float64
    }

    var paymentSummary []paymentSummaries
    db := config.DB()
    results :=  db.Table("payments").
    Select(`
        CASE strftime('%m', payments.payment_date)
            WHEN '01' THEN 'Jan'
            WHEN '02' THEN 'Feb'
            WHEN '03' THEN 'Mar'
            WHEN '04' THEN 'Apr'
            WHEN '05' THEN 'May'
            WHEN '06' THEN 'Jun'
            WHEN '07' THEN 'Jul'
            WHEN '08' THEN 'Aug'
            WHEN '09' THEN 'Sep'
            WHEN '10' THEN 'Oct'
            WHEN '11' THEN 'Nov'
            WHEN '12' THEN 'Dec'
        END AS PaymentMonth,
        SUM(total_amount) AS TotalAmount`).
    Group("PaymentMonth").
    Order("strftime('%m', payments.payment_date)").
    Scan(&paymentSummary)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, paymentSummary)
}

func ListPeoplePerMonth(c *gin.Context) {

    type PeopleMonth struct {
        Month string
        Total  float64
    }

    var peopleMonth []PeopleMonth
    db := config.DB()
    results :=  db.Table("bookings").
    Select("CASE strftime('%m', bookings.check_in) " +
        "WHEN '01' THEN 'Jan' " +
        "WHEN '02' THEN 'Feb' " +
        "WHEN '03' THEN 'Mar' " +
        "WHEN '04' THEN 'Apr' " +
        "WHEN '05' THEN 'May' " +
        "WHEN '06' THEN 'Jun' " +
        "WHEN '07' THEN 'Jul' " +
        "WHEN '08' THEN 'Aug' " +
        "WHEN '09' THEN 'Sep' " +
        "WHEN '10' THEN 'Oct' " +
        "WHEN '11' THEN 'Nov' " +
        "WHEN '12' THEN 'Dec' " +
        "END AS Month, SUM(room_types.id) AS Total").
    Joins("INNER JOIN rooms ON bookings.room_id = rooms.id").
    Joins("INNER JOIN room_types ON rooms.room_types_id = room_types.id").
    Group("Month").
    Order("strftime('%m', bookings.check_in)").
    Scan(&peopleMonth)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, peopleMonth)
}
func ListRoomsTypePercent(c *gin.Context) {
    type roomsType struct {
        RoomType string  `json:"room_type"`
        Count    int     `json:"count"`
        Percent  float64 `json:"percent"`
    }

    var roomsTypePercent []roomsType
    db := config.DB()

    // Fetch the counts of bookings per room type
    results := db.Table("bookings").
        Select("room_types.name AS room_type, COUNT(bookings.id) AS count, ROUND((COUNT(rooms.id) * 100.0 / SUM(COUNT(rooms.id)) OVER ()), 2) AS percent ").
        Joins("JOIN rooms ON bookings.room_id = rooms.id").
        Joins("JOIN room_types ON rooms.room_types_id = room_types.id").
        Group("room_types.id").
        Scan(&roomsTypePercent)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }


    c.JSON(http.StatusOK, roomsTypePercent)
}




func ListBookingsPerMonth(c *gin.Context) {

    db := config.DB()
    type BookingPerMonth struct {
        BookingMonth   string `json:"booking_month"`
        BookingYearMonth string `json:"booking_year_month"`
        TotalBookings  int64  `json:"total_bookings"`
    }

    var results []BookingPerMonth
    err := db.Table("bookings").
        Select(`
            CASE strftime('%m', check_in)
                WHEN '01' THEN 'Jan'
                WHEN '02' THEN 'Feb'
                WHEN '03' THEN 'Mar'
                WHEN '04' THEN 'Apr'
                WHEN '05' THEN 'May'
                WHEN '06' THEN 'Jun'
                WHEN '07' THEN 'Jul'
                WHEN '08' THEN 'Aug'
                WHEN '09' THEN 'Sep'
                WHEN '10' THEN 'Oct'
                WHEN '11' THEN 'Nov'
                WHEN '12' THEN 'Dec'
            END AS booking_month,
            strftime('%Y-%m', check_in) AS booking_year_month,
            COUNT(*) AS total_bookings
        `).
        Where("deleted_at IS NULL").
        Group("strftime('%Y-%m', check_in)").
        Order("strftime('%m', check_in)").
        Scan(&results).Error

    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, results)
}




func ListMeetingRoomsPerMonth(c *gin.Context) {
    db := config.DB() 

    type MeetingRoomPerMonth struct {
        MeetingRoomMonth   string `json:"meeting_room_month"`
        MeetingRoomYearMonth string `json:"meeting_room_year_month"`
        TotalMeetingRooms  int64  `json:"total_meeting_rooms"`
    }

    var results []MeetingRoomPerMonth
    err := db.Table("manage_rooms").
        Select(`
            CASE strftime('%m', manage_rooms.date_time)
                WHEN '01' THEN 'Jan'
                WHEN '02' THEN 'Feb'
                WHEN '03' THEN 'Mar'
                WHEN '04' THEN 'Apr'
                WHEN '05' THEN 'May'
                WHEN '06' THEN 'Jun'
                WHEN '07' THEN 'Jul'
                WHEN '08' THEN 'Aug'
                WHEN '09' THEN 'Sep'
                WHEN '10' THEN 'Oct'
                WHEN '11' THEN 'Nov'
                WHEN '12' THEN 'Dec'
            END AS meeting_room_month,
            strftime('%Y-%m', manage_rooms.date_time) AS meeting_room_year_month,
            COUNT(*) AS total_meeting_rooms
        `).
        Where("deleted_at IS NULL").
        Group("strftime('%Y-%m', manage_rooms.date_time)").
        Order("strftime('%m', manage_rooms.date_time)").
        Scan(&results).Error

    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, results)
}




func ListOrdersPerMonth(c *gin.Context) {
    db := config.DB() // Replace with your database connection setup
    type OrderPerMonth struct {
        OrderMonth   string `json:"order_month"`
        OrderYearMonth     string `json:"order_year_month"`
        TotalAmount  int64  `json:"total_amount"`
    }
    var results []OrderPerMonth
    err := db.Table("orders").
        Select(`
            CASE strftime('%m', order_date)
                WHEN '01' THEN 'Jan'
                WHEN '02' THEN 'Feb'
                WHEN '03' THEN 'Mar'
                WHEN '04' THEN 'Apr'
                WHEN '05' THEN 'May'
                WHEN '06' THEN 'Jun'
                WHEN '07' THEN 'Jul'
                WHEN '08' THEN 'Aug'
                WHEN '09' THEN 'Sep'
                WHEN '10' THEN 'Oct'
                WHEN '11' THEN 'Nov'
                WHEN '12' THEN 'Dec'
            END AS order_month,
            strftime('%Y-%m', order_date) AS order_year_month,
            SUM(amount) AS total_amount
        `).
        Where("deleted_at IS NULL").
        Group("strftime('%Y-%m', order_date)").
        Order("strftime('%m', order_date)").
        Scan(&results).Error

    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, results)
}