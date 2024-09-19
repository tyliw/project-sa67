package dashboard

import (
	"net/http"
	// "project-sa67/entity"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

func ListOrdersPerDay(c *gin.Context) {

    type OrderSummary struct {
        OrderDay   string
        TotalPrice float32
    }

    var orders []OrderSummary

    db := config.DB()
    results := db.Table("orders").
        Select("DATE(order_date) AS order_day, SUM(price) AS total_price").
        Group("DATE(order_date)").
        Order("order_day").
        Scan(&orders)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, orders)
}


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