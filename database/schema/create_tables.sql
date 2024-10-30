-- For use with SQLite Database
CREATE TABLE User_Types (
    ID INTEGER PRIMARY KEY ASC,
    type TEXT
);

CREATE TABLE Users (
    ID INTEGER PRIMARY KEY ASC,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    userTypeID INTEGER NOT NULL,
    creationTimestamp NUMERIC DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userTypeID) REFERENCES User_Types(ID)
);

CREATE TABLE Products (
    ID INTEGER PRIMARY KEY ASC,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    featured NUMERIC DEFAULT 0
);

CREATE TABLE Categories (
    ID INTEGER PRIMARY KEY ASC,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE Wishlist_Items (
    userID INTEGER NOT NULL,
    productID INTEGER NOT NULL,
    PRIMARY KEY(userID, productID),
    FOREIGN KEY(userID) REFERENCES Users(ID),
    FOREIGN KEY(productID) REFERENCES Products(ID)
);

CREATE TABLE Shopping_Cart_Items (
    userID INTEGER NOT NULL,
    productID INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(userID, productID),
    FOREIGN KEY(userID) REFERENCES Users(ID),
    FOREIGN KEY(productID) REFERENCES Products(ID)
);

CREATE TABLE Meal_Kits (
    productID INTEGER PRIMARY KEY NOT NULL,
    categoryID INTEGER,
    contents TEXT,
    allergens TEXT,
    FOREIGN KEY(productID) REFERENCES Products(ID),
    FOREIGN KEY(categoryID) REFERENCES Categories(ID)
);

CREATE TABLE Kit_Images (
    ID INTEGER PRIMARY KEY ASC,
    kitID INTEGER,
    description TEXT,
    url TEXT NOT NULL,
    width TEXT,
    height TEXT,
    FOREIGN KEY(kitID) REFERENCES Meal_Kits(productID)
);

CREATE TABLE Discount_Types (
    ID INTEGER PRIMARY KEY ASC,
    type TEXT NOT NULL UNIQUE
);

CREATE TABLE Discounts (
    ID INTEGER PRIMARY KEY ASC,
    typeID INTEGER NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY(typeID) REFERENCES Discount_Types(ID)
);

CREATE TABLE Discounted_Kits (
    kitID INTEGER NOT NULL,
    discountID INTEGER NOT NULL,
    creationTimestamp NUMERIC DEFAULT CURRENT_TIMESTAMP,
    expirationTimestamp NUMERIC DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(kitID) REFERENCES Meal_Kits(productID),
    FOREIGN KEY(discountID) REFERENCES Discounts(ID)
);