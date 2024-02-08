---------------------------------------------------------USERS---------------------------------------------------------


SELECT * FROM "fellas"."User"
--"SELECT * FROM \"fellas\".\"User\;"
SELECT * FROM "fellas"."User" WHERE User_ID = 'EXAMPLE'
--"SELECT * FROM \"fellas\".\"User\" WHERE User_ID = '" + UserID + "';"
INSERT INTO "fellas"."User" ("Name", "Address", "Email", "Password")
	VALUES ('EXAMPLE', 'EXAMPLE', 'EXAMPLE', 'EXAMPLE');
--"INSERT INTO \"fellas\".\"User\" (\"Name\", \"Address\", \"Email\", \"Password\") VALUES ('" + Name + "', '" + Address + "', '" + Email + "', '" + Password + "');"
UPDATE "fellas"."User"
	SET "Name" = 'NEW EXAMPLE',
		"Address" = 'NEW EXAMPLE',
		"Email" = 'NEW EXAMPLE',
		"Password" = 'NEW EXAMPLE'
	WHERE User_ID = 'EXAMPLE'
--"UPDATE \"fellas\".\"User\" SET \"Name\" = '" + Name + "', \"Address\" = '" + Address + "', \"Email\" = '" + Email + "', \"Password\" = '" + Password + "' WHERE User_ID = 'EXAMPLE';"
DELETE FROM "fellas"."User" WHERE User_ID = 'EXAMPLE'
--"DELETE FROM \"fellas\".\"User\" WHERE User_ID = '" + UserID + "'"


---------------------------------------------------------USERS---------------------------------------------------------


