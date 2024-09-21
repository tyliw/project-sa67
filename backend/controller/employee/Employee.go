package employee

import (
	"errors"
	"net/http"
	"project-sa67/config"
	"project-sa67/entity/employee"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /employees
func CreateEmployee(c *gin.Context) {
	var employee entity.Employee

	// Bind JSON to the employee struct
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Check if a position with the provided PositionID exists
	var position entity.Position
	db.First(&position, employee.PositionID)
	if position.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Position not found"})
		return
	}

	// Check if the employee with the provided email already exists
	var existingEmployee entity.Employee
	result := db.Where("email = ?", employee.Email).First(&existingEmployee)
	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// If there's a database error other than "record not found"
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if existingEmployee.ID != 0 {
		// If the email is already registered
		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		return
	}

	// Hash the password
	hashedPassword, err := config.HashPassword(employee.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Password encryption failed"})
		return
	}

	// Assign the hashed password back to the employee struct
	employee.Password = hashedPassword

	// Create the employee in the database
	if err := db.Create(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Employee created successfully", "data": employee})
}

// GET /employees/:id
func GetEmployee(c *gin.Context) {
	ID := c.Param("id")
	var employee entity.Employee

	db := config.DB()
	result := db.Preload("Position").First(&employee, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	if employee.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, employee)
}

// GET /employees
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee

	db := config.DB()
	result := db.Preload("Position").Find(&employees)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, employees)
}

// DELETE /employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

// PATCH /employees/:id
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee

	ID := c.Param("id")

	db := config.DB()
	result := db.First(&employee, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&employee)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
