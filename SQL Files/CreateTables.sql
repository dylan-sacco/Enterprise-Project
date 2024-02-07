CREATE SCHEMA "fellas";
GO 

CREATE TABLE "fellas"."User" (
    "User_ID" NVARCHAR(8) NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Address" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR NOT NULL,
    "Password" NVARCHAR(20) NOT NULL,
    PRIMARY KEY ("User_ID")
);

CREATE TABLE "fellas"."Order" (
    "Order_ID" VARCHAR(8) NOT NULL,
    "User_ID" NVARCHAR(8) NOT NULL,
    "Total_Price" DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY ("Order_ID"),
    FOREIGN KEY ("User_ID") REFERENCES "fellas"."User" ("User_ID")
);

CREATE TABLE "fellas"."Product" (
    "Product_ID" VARCHAR(8) NOT NULL,
    "Name" NVARCHAR(255) NOT NULL,
    "Description" NVARCHAR(255) NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "Image" IMAGE NOT NULL,
    PRIMARY KEY ("Product_ID")
);

CREATE TABLE "fellas"."Invoice" (
    "Invoice_ID" VARCHAR(10) NOT NULL,
    "Order_ID" VARCHAR(8) NOT NULL,
    "Product_ID" VARCHAR(8) NOT NULL,
    "Quantity" BIGINT NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY ("Invoice_ID"),
    FOREIGN KEY ("Order_ID") REFERENCES "fellas"."Order" ("Order_ID"),
    FOREIGN KEY ("Product_ID") REFERENCES "fellas"."Product" ("Product_ID")
);

