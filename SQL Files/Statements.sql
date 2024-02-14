---------------------------------------------------------USERS---------------------------------------------------------


SELECT * FROM "fellas"."User"
--"SELECT * FROM \"fellas\".\"User\";"
SELECT * FROM "fellas"."User" WHERE User_ID = 'EXAMPLE'
--"SELECT * FROM \"fellas\".\"User\" WHERE User_ID = '" + UserID + "';"
INSERT INTO "fellas"."User" (Name, Address, Email, Password)
	VALUES ('EXAMPLE', 'EXAMPLE', 'EXAMPLE', 'EXAMPLE');
--"INSERT INTO \"fellas\".\"User\" (Name, Address, Email, Password) VALUES ( ?, ?, ?, ?);"
UPDATE "fellas"."User"
	SET "Name" = 'NEW EXAMPLE',
		"Address" = 'NEW EXAMPLE',
		"Email" = 'NEW EXAMPLE',
		"Password" = 'NEW EXAMPLE'
	WHERE User_ID = 'EXAMPLE'
--"UPDATE \"fellas\".\"User\" SET \"Name\" = '" + Name + "', Address = '" + Address + "', Email = '" + Email + "', Password = '" + Password + "' WHERE User_ID = '" + UserID + "';"
DELETE FROM "fellas"."User" WHERE User_ID = 'EXAMPLE'
--"DELETE FROM \"fellas\".\"User\" WHERE User_ID = '" + UserID + "'"


---------------------------------------------------------Order---------------------------------------------------------


SELECT * FROM "fellas"."Order";
--"SELECT * FROM \"fellas\".\"Order\";"
SELECT * FROM "fellas"."Order" WHERE Order_ID = 'EXAMPLE'
INSERT INTO "fellas"."Order" (User_ID, Total_Price)
	VALUES ('EXAMPLE', 0);
--"INSERT INTO \"fellas\".\"Order\" (User_ID, Total_Price) VALUES ('" + UserID + "', '" + TotalPrice + "');"
UPDATE "fellas"."Order"
	SET    Total_Price = 0
	WHERE "Order_ID" = 'EXAMPLE';
--"UPDATE \"fellas\".\"Order\" SET Total_Price = " + TotalPrice + " WHERE Order_ID = '" + OrderID + "';"
DELETE FROM "fellas"."Order" WHERE "Order_ID" = 'EXAMPLE';
--"DELETE FROM \"fellas\".\"Order\" WHERE Order_ID = '" + OrderID + "';"


---------------------------------------------------------Product---------------------------------------------------------


SELECT * FROM "fellas"."Product";
--"SELECT * FROM \"fellas\".\"Product\";"
SELECT * FROM "fellas"."Product" WHERE Product_ID = 'EXAMPLE'
--"SELECT * FROM \"fellas\".\"Product\" WHERE Product_ID = '" + ProductID + "';"
INSERT INTO "fellas"."Product" (Name, Description, Price, Image)
	VALUES ('EXAMPLE', 'EXAMPLE', 0, 'EXAMPLE');
--"INSERT INTO \"fellas\".\"Product\" (Name, Description, Price, Image) VALUES ('" + Name + "', '" + Description + "', " + Price + ", '" + Image + "');"
UPDATE "fellas"."Product"
	SET Name = 'NEW EXAMPLE',
		Description = 'NEW EXAMPLE',
		Price = 0,
		Image = 'NEW EXAMPLE'
	WHERE Product_ID = 'EXAMPLE';
--"UPDATE \"fellas\".\"Product\" SET Name = '" + Name + "', Description = '"Description"', Price = " + Price + ", Image = '" + Image + "' WHERE Product_ID = '" + ProductID + "';"
DELETE FROM "fellas"."Product" WHERE Product_ID = 'EXAMPLE';
--"DELETE \"fellas\".\"Product\" WHERE Product_ID = '" + ProductID + "';"


---------------------------------------------------------Invoice---------------------------------------------------------


