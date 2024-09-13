package main

import (
	"net/http"
	"project-sa67/config"
	"project-sa67/controller"

	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
	
	config.ConnectionDB()
   	config.SetupDatabase()

   	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		// Employee Routes
		router.GET("/employees", controller.ListEmployees)
		router.GET("/employees/:id", controller.GetEmployee)
		router.POST("/employees", controller.CreateEmployee)
		router.PATCH("/employees/:id", controller.UpdateEmployee)
		router.DELETE("/employees/:id", controller.DeleteEmployee)

		// Position Routes
		router.GET("/positions", controller.ListPositions)
		
		// User Routes
		router.GET("/meetingRoom", controller.ListMeetingRoom)
		router.GET("/meetingRoom/:id", controller.GetMeetingRoom) // Corrected route name
		router.POST("/meetingRoom", controller.CreateMeetingRoom) // Assuming you want to create a meeting room
		router.PATCH("/meetingRoom", controller.UpdateMeetingRoom)
		router.DELETE("/meetingRoom/:id", controller.DeleteMeetingRoom)

		// Customer Routes
		router.GET("/customerMeetingRoom", controller.ListCustomerMeetingRoom)
		router.GET("/customerMeetingRoom/:id", controller.GetCustomerMeetingRoom) // Corrected route name
		router.POST("/customerMeetingRoom", controller.CreateCustomerMeetingRoom) // Assuming you want to create a customer meeting room
		router.PATCH("/customerMeetingRoom", controller.UpdateCustomerMeetingRoom)
		router.DELETE("/customerMeetingRoom/:id", controller.DeleteCustomerMeetingRoom)

		// Booking Routes
		router.GET("/bookingMeetingRoom", controller.ListBookingMeetingRoom)
		router.GET("/bookingMeetingRoom/:id", controller.GetBookingMeetingRoom) // Corrected route name
		router.POST("/bookingMeetingRoom", controller.CreateBookingMeetingRoom) // Assuming you want to create a booking for a meeting room
		router.PATCH("/bookingMeetingRoom", controller.UpdateBookingMeetingRoom)
		router.DELETE("/bookingMeetingRoom/:id", controller.DeleteBookingMeetingRoom)

		// FoodCategory Routes
		router.POST("/food-categories", controller.CreateFoodCategory)
		router.GET("/food-categories/:id", controller.GetFoodCategory)
		router.GET("/food-categories", controller.ListFoodCategories)
		router.DELETE("/food-categories/:id", controller.DeleteFoodCategory)
		router.PATCH("/food-categories/:id", controller.UpdateFoodCategory)

		// Meal Routes
		router.POST("/meals", controller.CreateMeal)
		router.GET("/meals/:id", controller.GetMeal)
		router.GET("/meals", controller.ListMeals)
		router.DELETE("/meals/:id", controller.DeleteMeal)
		router.PATCH("/meals/:id", controller.UpdateMeal)

		// Booking Routes
		router.POST("/bookings", controller.CreateBooking)
		router.GET("/bookings/:id", controller.GetBooking)
		router.GET("/bookings", controller.ListBookings)
		router.DELETE("/bookings/:id", controller.DeleteBooking)
		router.PATCH("/bookings/:id", controller.UpdateBooking)

		// Menu Routes
		router.POST("/menus", controller.CreateMenu)
		router.GET("/menus/:id", controller.GetMenu)
		router.GET("/menus", controller.ListMenus)
		router.DELETE("/menus/:id", controller.DeleteMenu)
		router.PATCH("/menus/:id", controller.UpdateMenu)

		// Order Routes
		router.POST("/orders", controller.CreateOrder)
		router.GET("/orders/:id", controller.GetOrder)
		router.GET("/orders", controller.ListOrders)
		router.DELETE("/orders/:id", controller.DeleteOrder)
		router.PATCH("/orders/:id", controller.UpdateOrder)

		// Payment Routes
		router.POST("/payments", controller.CreatePayment)
		router.GET("/payments/:id", controller.GetPayment)
		router.GET("/payments", controller.ListPayment)
		router.DELETE("/payments/:id", controller.DeletePayment)
		router.PATCH("/payments/:id", controller.UpdatePayment)

		// Dashboard
		router.GET("/orders_per_day", controller.ListOrdersPerDay)
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Start the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}