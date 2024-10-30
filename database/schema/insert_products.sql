--Inserts sample products into BOXED_EATS.db
--In Meal_Kits(contents) meals are seperated by '/' and meal contents are listed in '()' and seperated by ','
--Possibly convert to JSON string implementation
INSERT INTO Products (name, price, description, featured)
VALUES ("Bento Box", 30.99, "Asian style bento box kit", TRUE);
INSERT INTO Meal_Kits (productID, categoryID, contents, allergens)
VALUES (1, 2, "3 Bulgolgi Beef Meals (Bulgolgi Beef, Scrambled egg rolls, white rice)/2 Rice Ball Meals (Salmon rice balls, Carrot sticks)", "Peanut Allergen, Egg Allergen");

INSERT INTO Products (name, price, description, featured)
VALUES ("Chipolte Breakfast Burritos", 29.97, "Breakfast burritos with chipolte mexican sausage, scrambled eggs, cheese and fried potatoes", FALSE);
INSERT INTO Meal_Kits (productID, categoryID, contents, allergens)
VALUES (2, 1, "5 Chipolte Breakfast Burrito Meals (Chipolte sausage, Four cheese blend, Scrambled eggs, Fried potatoes, Flour tortilla)", "Egg Allergen, Milk Allergen");

INSERT INTO Products (name, price, description, featured)
VALUES ("Steak and Cheesy Mashed Potatoes", 39.99, "Perfectly seasoned steak bites with four cheese mashed potatoes and a side of steamed broccoli", FALSE);
INSERT INTO Meal_Kits (productID, categoryID, contents, allergens)
VALUES (3, 3, "5 Steak and Four Cheese Mashed Potato Meals (NY Strip Steak, Four Cheese Mashed Potatoes, Steamed Broccoli)", "Milk Allergen");