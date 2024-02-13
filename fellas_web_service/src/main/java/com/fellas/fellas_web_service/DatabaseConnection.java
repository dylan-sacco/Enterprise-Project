package com.fellas.fellas_web_service;

import com.fellas.fellas_web_service.Tables.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.DriverManager;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class DatabaseConnection{
    final static String connectionString = "jdbc:sqlserver://demoserverball.database.windows.net:1433;database=demo;user=jball@demoserverball;password=Baberuth#6;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;";

    static Connection connection;
    static Statement statement;
    static ResultSet resultSet; 
    static String sql;

    static List<User>     users     =  new ArrayList<User>();
    static List<Product>  products  =  new ArrayList<Product>();
    static List<Order>    orders    =  new ArrayList<Order>();
    static List<Invoice>  invoices  =  new ArrayList<Invoice>();

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
        sql = "INSERT INTO \"fellas\".\"User\" (User_ID, Name, Address, Email, Password) VALUES ('" + newUser.getUserID() + "', '" + newUser.getName() + "', '" + newUser.getAddress() + "', '" + newUser.getEmail() + "', '" + newUser.getPassword() + "');";
        statement.executeUpdate(sql);
    }

    public void User_UPDATE(User newUser) throws Exception {
        sql = "UPDATE \"fellas\".\"User\" SET Name = '" + newUser.getName() + "', Address = '" + newUser.getAddress() + "', Email = '" + newUser.getEmail() + "', Password = '" + newUser.getPassword() + "' WHERE User_ID = '" + newUser.getUserID() + "';";
        statement.executeUpdate(sql);
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
                                     resultSet.getDouble("Price")));
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
                                     resultSet.getDouble("Price")));
        }

        String json = gson.toJson(products);

        return json;
    }

    public void Product_INSERT(Product newProduct) throws Exception {
        sql = "INSERT INTO \"fellas\".\"Product\" (Product_ID, Name, Description, Price) VALUES ('" + newProduct.getProductID() + "', '" + newProduct.getName() + "', '" + newProduct.getDescription() + "', " + newProduct.getPrice() + ");";
        statement.executeUpdate(sql);
    }

    public void Product_UPDATE(Product newProduct) throws Exception {
        sql = "UPDATE \"fellas\".\"Product\" SET Name = '" + newProduct.getName() + "', Description = '" + newProduct.getDescription() + "', Price = " + newProduct.getPrice() + " WHERE Product_ID = '" + newProduct.getProductID() + "';";
        statement.executeUpdate(sql);
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
        sql = "INSERT INTO \"fellas\".\"Order\" (Order_ID, User_ID, Total_Price) VALUES ('" + newOrder.getOrderID() + "', '" + newOrder.getUserID() + "', " + newOrder.getTotalPrice() + ");";
        statement.executeUpdate(sql);
    }

    public void Order_UPDATE(Order newOrder) throws Exception {
        sql = "UPDATE \"fellas\".\"Order\" SET User_ID = '" + newOrder.getUserID() + "', Total_Price = " + newOrder.getTotalPrice() + " WHERE Order_ID = '" + newOrder.getOrderID() + "';";
        statement.executeUpdate(sql);
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
        sql = "INSERT INTO \"fellas\".\"Invoice\" (Invoice_ID, Order_ID, Product_ID, Quantity, Price) VALUES ('" + newInvoice.getInvoiceID() + "', '" + newInvoice.getOrderID() + "', '" + newInvoice.getProductID() + "', " + newInvoice.getQuantity() + ", " + newInvoice.getPrice() + ");";
        statement.executeUpdate(sql);
    }

    public void Invoice_UPDATE(Invoice newInvoice) throws Exception {
        sql = "UPDATE \"fellas\".\"Invoice\" SET Order_ID = '" + newInvoice.getOrderID() + "', Product_ID = '" + newInvoice.getProductID() + "', Quantity = " + newInvoice.getQuantity() + ", Price = " + newInvoice.getPrice() + " WHERE Invoice_ID = '" + newInvoice.getInvoiceID() + "';";
        statement.executeUpdate(sql);
    }

    public void Invoice_DELETE(String InvoiceID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Invoice\" WHERE Invoice_ID = '" + InvoiceID + "';";
        statement.executeUpdate(sql);
    }
}