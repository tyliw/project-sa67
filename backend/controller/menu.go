package controller

import (
	"net/http"
	"project-sa67/entity/food_service"
	"project-sa67/config"
	"github.com/gin-gonic/gin"
)

// POST /menus
func CreateMenu(c *gin.Context) {
    var menu entity.Menu
    if err := c.ShouldBindJSON(&menu); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    var meal entity.Meal
    db.First(&meal, menu.MealID)
    if meal.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "meal not found"})
        return
    }

    var foodCategory entity.FoodCategory
    db.First(&foodCategory, menu.FoodCategoryID)
    if foodCategory.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "foodCategory not found"})
        return
    }

    m := entity.Menu{
        MenuList:  menu.MenuList,
        Price:     menu.Price,
        Description: menu.Description,
        ImageMenu:     menu.ImageMenu,
        MealID:    menu.MealID,
        Meal:      &meal,
        FoodCategoryID: menu.FoodCategoryID,
        FoodCategory: &foodCategory,
    }

    if err := db.Create(&m).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"data": m})
}


// GET /menus/:id
func GetMenu(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")

	db := config.DB()
    results := db.Preload("Meal").Preload("FoodCategory").Find(&menu, id)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
	if menu.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}

    c.JSON(http.StatusOK, menu)
}

// GET /menus
func ListMenus(c *gin.Context) {
    var menu []entity.Menu

    db := config.DB()
    results := db.Preload("Meal").Preload("FoodCategory").Find(&menu)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, menu)
}

// DELETE /menus/:id
func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Menu{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /menus/:id
func UpdateMenu(c *gin.Context) {
    var menu entity.Menu
    MenuID := c.Param("id")

    db := config.DB()

    // Find the menu entry to update
    result := db.First(&menu, MenuID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Menu not found"})
        return
    }

    // Only update the fields provided in the request payload
    var updateData struct {
        MenuList       string
        Price          float32
        Description    string 
        ImageMenu      string 
        MealID         uint
        FoodCategoryID uint
    }

    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    // Use db.Model(&menu).Updates() to update only the specified fields
    result = db.Model(&menu).Updates(entity.Menu{
        MenuList:       updateData.MenuList,
        Price:          updateData.Price,
        Description:    updateData.Description,
        ImageMenu:      updateData.ImageMenu,
        MealID:         updateData.MealID,
        FoodCategoryID: updateData.FoodCategoryID,
    })

    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update menu"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Updated successfully", "data": menu})
}
