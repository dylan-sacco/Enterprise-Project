-- Trigger for "User" table
GO
CREATE OR ALTER TRIGGER "set_user_id"
ON "fellas"."User"
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO "fellas"."User" ("User_ID", "Name", "Address", "Email", "Password")
    SELECT NEXT VALUE FOR "fellas"."User_Seq", "Name", "Address", "Email", "Password"
    FROM INSERTED;
END;

-- Trigger for "Order" table
GO
CREATE OR ALTER TRIGGER "set_order_id"
ON "fellas"."Order"
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO "fellas"."Order" ("Order_ID", "User_ID", "Total_Price")
    SELECT NEXT VALUE FOR "fellas"."Order_Seq", "User_ID", "Total_Price"
    FROM INSERTED;
END;

-- Trigger for "Product" table
GO
CREATE OR ALTER TRIGGER "set_product_id"
ON "fellas"."Product"
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO "fellas"."Product" ("Product_ID", "Name", "Description", "Price", "Image")
    SELECT NEXT VALUE FOR "fellas"."Product_Seq", "Name", "Description", "Price", "Image"
    FROM INSERTED;
END;

-- Trigger for "Invoice" table
GO
CREATE OR ALTER TRIGGER "set_invoice_id"
ON "fellas"."Invoice"
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO "fellas"."Invoice" ("Invoice_ID", "Order_ID", "Product_ID", "Quantity", "Price")
    SELECT NEXT VALUE FOR "fellas"."Invoice_Seq", "Order_ID", "Product_ID", "Quantity", "Price"
    FROM INSERTED;
END;

--Trigger for "Cart" table
GO
CREATE OR ALTER TRIGGER "set_cart_id"
ON "fellas"."Cart"
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO "fellas"."Cart" ("Checkout_ID", "User_ID", "Product_ID", "Quantity")
    SELECT NEXT VALUE FOR "fellas"."Cart_Seq", "User_ID", "Product_ID", "Quantity"
    FROM INSERTED;
END;

--Function for getting the Total Price of the items in a user's cart
GO
CREATE OR ALTER FUNCTION dbo.GetTotalCartPrice(@User_ID NVARCHAR(8))
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @TotalPrice DECIMAL(10, 2);
    
    SELECT @TotalPrice = SUM(p.Price * c.Quantity)
    FROM fellas.Cart c
    INNER JOIN fellas.Product p ON c.Product_ID = p.Product_ID
    WHERE c.User_ID = @User_ID;
    
    RETURN COALESCE(@TotalPrice, 0);
END;