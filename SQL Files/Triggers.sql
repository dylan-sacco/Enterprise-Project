-- Trigger for "User" table
GO
CREATE TRIGGER "set_user_id"
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
CREATE TRIGGER "set_order_id"
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
CREATE TRIGGER "set_product_id"
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
CREATE TRIGGER "set_invoice_id"
ON "fellas"."Invoice"
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO "fellas"."Invoice" ("Invoice_ID", "Order_ID", "Product_ID", "Quantity", "Price")
    SELECT NEXT VALUE FOR "fellas"."Invoice_Seq", "Order_ID", "Product_ID", "Quantity", "Price"
    FROM INSERTED;
END;