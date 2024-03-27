package com.fellas.fellas_web_service;

import com.fellas.fellas_web_service.Tables.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.DriverManager;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class DatabaseConnection{
    @Value("${database.connectionString}")
    private static String connectionString;
    
    static public Connection connection;
    static Statement statement;
    static PreparedStatement preparedStatement;
    static ResultSet resultSet; 
    static String sql;

    static List<User>     users     =  new ArrayList<User>();
    static List<Product>  products  =  new ArrayList<Product>();
    static List<Order>    orders    =  new ArrayList<Order>();
    static List<Invoice>  invoices  =  new ArrayList<Invoice>();
    static List<Cart>     carts     =  new ArrayList<Cart>();

    static Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public DatabaseConnection(){
        try{
            connection = DriverManager.getConnection(connectionString);
            statement = connection.createStatement();
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

//-------------------------------------------Users Methods---------------------------------------------
    public String User_SELECT() throws Exception {
        users.clear();
        sql = "SELECT * FROM \"fellas\".\"User\";";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            users.add(new User(resultSet.getString("User_ID"), 
                               resultSet.getString("Name"),
                               resultSet.getString("Address"),
                               resultSet.getString("Email"),
                               resultSet.getString("Password")));
        }

        String json = gson.toJson(users);

        return json;
    }

    public String User_SELECT(String UserID) throws Exception {
        users.clear();
        sql = "SELECT * FROM \"fellas\".\"User\" WHERE User_ID = '" + UserID + "';";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            users.add(new User(resultSet.getString("User_ID"), 
                               resultSet.getString("Name"),
                               resultSet.getString("Address"),
                               resultSet.getString("Email"),
                               resultSet.getString("Password")));
        }

        String json = gson.toJson(users);

        return json;
    }

    public void User_INSERT(User newUser) throws Exception {
        sql = "INSERT INTO \"fellas\".\"User\" (Name, Address, Email, Password) VALUES (?, ?, ?, ?);";
        
        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newUser.getName());
            preparedStatement.setString(2, newUser.getAddress());
            preparedStatement.setString(3, newUser.getEmail());
            preparedStatement.setString(4, newUser.getPassword());

        preparedStatement.executeUpdate();
    }

    public void User_UPDATE(User newUser) throws Exception {
        sql = "UPDATE \"fellas\".\"User\" SET Name = ?, Address = ?, Email = ?, Password = ? WHERE User_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newUser.getName());
            preparedStatement.setString(2, newUser.getAddress());
            preparedStatement.setString(3, newUser.getEmail());
            preparedStatement.setString(4, newUser.getPassword());
            preparedStatement.setString(5, newUser.getUserID());

        preparedStatement.executeUpdate();
    }

    public void User_DELETE(String UserID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"User\" WHERE User_ID = '" + UserID + "';";
        statement.executeUpdate(sql);
    }
//-------------------------------------------Products Methods------------------------------------------
    public String Product_SELECT() throws Exception {
        products.clear();
        sql = "SELECT * FROM \"fellas\".\"Product\";";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            products.add(new Product(resultSet.getString("Product_ID"), 
                                     resultSet.getString("Name"),
                                     resultSet.getString("Description"),
                                     resultSet.getDouble("Price"),
                                     resultSet.getBytes("Image")));
        }

        String json = gson.toJson(products);

        return json;
    }

    public String Product_SELECT(String ProductID) throws Exception {
        products.clear();
        sql = "SELECT * FROM \"fellas\".\"Product\" WHERE Product_ID = '" + ProductID + "';";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            products.add(new Product(resultSet.getString("Product_ID"), 
                                     resultSet.getString("Name"),
                                     resultSet.getString("Description"),
                                     resultSet.getDouble("Price"),
                                     resultSet.getBytes("Image")));
        }

        String json = gson.toJson(products);

        return json;
    }

    public byte[] Product_SELECT_Image(String ProductID) throws Exception {
        sql = "SELECT Image FROM \"fellas\".\"Product\" WHERE Product_ID = '" + ProductID + "';";
        resultSet = statement.executeQuery(sql);

        byte[] image = null;
        while(resultSet.next()){
            image = resultSet.getBytes("Image");
        }

        return image;
    }

    public void Product_INSERT(Product newProduct) throws Exception {
        sql = "INSERT INTO \"fellas\".\"Product\" (Name, Description, Price, Image) VALUES (?, ?, ?, ?);";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newProduct.getName());
            preparedStatement.setString(2, newProduct.getDescription());
            preparedStatement.setDouble(3, newProduct.getPrice());
            preparedStatement.setBytes(4, newProduct.getImage());
        
        preparedStatement.executeUpdate();
    }

    public void Product_UPDATE(Product newProduct) throws Exception {
        sql = "UPDATE \"fellas\".\"Product\" SET Name = ?, Description = ?, Price = ?, Image = ? WHERE Product_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newProduct.getName());
            preparedStatement.setString(2, newProduct.getDescription());
            preparedStatement.setDouble(3, newProduct.getPrice());
            preparedStatement.setBytes(4, newProduct.getImage());
            preparedStatement.setString(5, newProduct.getProductID());
        
        preparedStatement.executeUpdate();
    }

    public void Product_DELETE(String ProductID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Product\" WHERE Product_ID = '" + ProductID + "';";
        statement.executeUpdate(sql);
    }
//-------------------------------------------Orders Methods--------------------------------------------
    public String Order_SELECT() throws Exception {
        orders.clear();
        sql = "SELECT * FROM \"fellas\".\"Order\";";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            orders.add(new Order(resultSet.getString("Order_ID"), 
                                 resultSet.getString("User_ID"),
                                 resultSet.getDouble("Total_Price")));
        }

        String json = gson.toJson(orders);

        return json;
    }

    public String Order_SELECT(String OrderID) throws Exception {
        orders.clear();
        sql = "SELECT * FROM \"fellas\".\"Order\" WHERE Order_ID = '" + OrderID + "';";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            orders.add(new Order(resultSet.getString("Order_ID"), 
                                 resultSet.getString("User_ID"),
                                 resultSet.getDouble("Total_Price")));
        }

        String json = gson.toJson(orders);

        return json;
    }

    public void Order_INSERT(Order newOrder) throws Exception {
        sql = "INSERT INTO \"fellas\".\"Order\" (User_ID, Total_Price) VALUES (?, ?);";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newOrder.getUserID());
            preparedStatement.setDouble(2, newOrder.getTotalPrice());

        preparedStatement.executeUpdate();
    }

    public void Order_UPDATE(Order newOrder) throws Exception {
        sql = "UPDATE \"fellas\".\"Order\" SET User_ID = ?, Total_Price = ? WHERE Order_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newOrder.getUserID());
            preparedStatement.setDouble(2, newOrder.getTotalPrice());
            preparedStatement.setString(3, newOrder.getOrderID());

        preparedStatement.executeUpdate();
    }

    public void Order_DELETE(String OrderID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Order\" WHERE Order_ID = '" + OrderID + "';";
        statement.executeUpdate(sql);
    }
//-------------------------------------------Invoices Methods------------------------------------------
    public String Invoice_SELECT() throws Exception {
        invoices.clear();
        sql = "SELECT * FROM \"fellas\".\"Invoice\";";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            invoices.add(new Invoice(resultSet.getString("Invoice_ID"), 
                                     resultSet.getString("Order_ID"),
                                     resultSet.getString("Product_ID"),
                                     resultSet.getInt("Quantity"),
                                     resultSet.getDouble("Price")));
        }

        String json = gson.toJson(invoices);

        return json;
    }

    public String Invoice_SELECT(String InvoiceID) throws Exception {
        invoices.clear();
        sql = "SELECT * FROM \"fellas\".\"Invoice\" WHERE Invoice_ID = '" + InvoiceID + "';";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            invoices.add(new Invoice(resultSet.getString("Invoice_ID"), 
                                     resultSet.getString("Order_ID"),
                                     resultSet.getString("Product_ID"),
                                     resultSet.getInt("Quantity"),
                                     resultSet.getDouble("Price")));
        }

        String json = gson.toJson(invoices);

        return json;
    }

    public void Invoice_INSERT(Invoice newInvoice) throws Exception {
        sql = "INSERT INTO \"fellas\".\"Invoice\" (Order_ID, Product_ID, Quantity, Price) VALUES (?, ?, ?, ?);";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newInvoice.getOrderID());
            preparedStatement.setString(2, newInvoice.getProductID());
            preparedStatement.setInt(3, newInvoice.getQuantity());
            preparedStatement.setDouble(4, newInvoice.getPrice());

        preparedStatement.executeUpdate();
    }

    public void Invoice_UPDATE(Invoice newInvoice) throws Exception {
        sql = "UPDATE \"fellas\".\"Invoice\" SET Order_ID = ?, Product_ID = ?, Quantity = ?, Price = ? WHERE Invoice_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newInvoice.getOrderID());
            preparedStatement.setString(2, newInvoice.getProductID());
            preparedStatement.setInt(3, newInvoice.getQuantity());
            preparedStatement.setDouble(4, newInvoice.getPrice());
            preparedStatement.setString(5, newInvoice.getInvoiceID());

        preparedStatement.executeUpdate();
    }

    public void Invoice_DELETE(String InvoiceID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Invoice\" WHERE Invoice_ID = '" + InvoiceID + "';";
        statement.executeUpdate(sql);
    }
    //-------------------------------------------Cart Methods------------------------------------------
    public String Cart_SELECT() throws Exception {
        carts.clear();
        sql = "SELECT * FROM \"fellas\".\"Cart\";";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            carts.add(new Cart(resultSet.getString("Checkout_ID"), 
                                     resultSet.getString("User_ID"),
                                     resultSet.getString("Product_ID"),
                                     resultSet.getInt("Quantity")));
        }

        String json = gson.toJson(carts);

        return json;
    }

    public String Cart_SELECT(String CheckoutID) throws Exception {
        carts.clear();
        sql = "SELECT * FROM \"fellas\".\"Cart\" WHERE Checkout_ID = '" + CheckoutID + "';";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            carts.add(new Cart(resultSet.getString("Checkout_ID"), 
                                     resultSet.getString("User_ID"),
                                     resultSet.getString("Product_ID"),
                                     resultSet.getInt("Quantity")));
        }

        String json = gson.toJson(carts);

        return json;
    }

    public String Cart_SELECT_User(String UserID) throws Exception {
        carts.clear();
        sql = "SELECT * FROM \"fellas\".\"Cart\" WHERE User_ID = '" + UserID + "';";
        resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            carts.add(new Cart(resultSet.getString("Checkout_ID"), 
                                     resultSet.getString("User_ID"),
                                     resultSet.getString("Product_ID"),
                                     resultSet.getInt("Quantity")));
        }

        String json = gson.toJson(carts);

        return json;
    }

    public double Cart_SELECT_Price(String UserID, String ProductID) throws Exception{
        double price = 0;
        int quantity = 0;
        
        sql = "SELECT p.\"Price\" FROM \"fellas\".\"Cart\" c JOIN \"fellas\".\"Product\" p ON c.Product_ID = p.Product_ID WHERE User_ID = '" + UserID + "' AND c.Product_ID = '" + ProductID + "';";
        resultSet = statement.executeQuery(sql);
        while(resultSet.next()){
            price = resultSet.getDouble("Price");
        }

        sql = "SELECT Quantity FROM \"fellas\".\"Cart\" WHERE User_ID = '" + UserID + "' AND Product_ID = '" + ProductID + "';";
        resultSet = statement.executeQuery(sql);
        while(resultSet.next()){
            quantity = resultSet.getInt("Quantity");
        }

        return price * quantity;
    }

    public double Cart_SELECT_Total(String UserID) throws Exception {
        carts.clear();

        
        sql = "SELECT dbo.GetTotalCartPrice('" + UserID + "')";
        resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            return resultSet.getDouble(1);
        }

        return 0;
        
        /*sql = "SELECT * FROM \"fellas\".\"Cart\" WHERE User_ID = '" + UserID + "';";
        resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            carts.add(new Cart(resultSet.getString("Checkout_ID"), 
                                     resultSet.getString("User_ID"),
                                     resultSet.getString("Product_ID"),
                                     resultSet.getInt("Quantity")));
            
        }
        double total = 0;

        try {
            for (Cart cart : carts) {
                total += Cart_SELECT_Price(cart.getUserID(), cart.getProductID());
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        return total;*/
    }

    public void Cart_INSERT(Cart newCart) throws Exception {
        sql = "INSERT INTO \"fellas\".\"Cart\" (User_ID, Product_ID, Quantity) VALUES (?, ?, ?);";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newCart.getUserID());
            preparedStatement.setString(2, newCart.getProductID());
            preparedStatement.setInt(3, newCart.getQuantity());

        preparedStatement.executeUpdate();
    }

    public void Cart_UPDATE(Cart newCart) throws Exception {
        sql = "UPDATE \"fellas\".\"Cart\" SET User_ID = ?, Product_ID = ?, Quantity = ? WHERE Checkout_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newCart.getUserID());
            preparedStatement.setString(2, newCart.getProductID());
            preparedStatement.setInt(3, newCart.getQuantity());
            preparedStatement.setString(4, newCart.getCheckoutID());

        preparedStatement.executeUpdate();
    }

    public void Cart_DELETE(String CheckoutID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Cart\" WHERE Checkout_ID = '" + CheckoutID + "';";
        statement.executeUpdate(sql);
    }

    public void Cart_DELETE_User(String UserID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Cart\" WHERE User_ID = '" + UserID + "';";
        statement.executeUpdate(sql);
    }

    public void Cart_DELETE_Product(String ProductID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Cart\" WHERE Product_ID = '" + ProductID + "';";
        statement.executeUpdate(sql);
    }
}