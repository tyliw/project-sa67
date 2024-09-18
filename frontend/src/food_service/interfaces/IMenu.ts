import { MealInterface } from "./IMeal";

export interface MenuInterface {
  ID: number;
  MenuList: string;
  Price: number;
  Description: string;
  ImageMenu?:   string 
  MealID: number;
  Meal?: MealInterface
  FoodCategoryID?: number;
}
