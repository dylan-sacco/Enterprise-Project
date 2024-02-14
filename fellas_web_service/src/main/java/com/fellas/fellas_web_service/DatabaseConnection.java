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

    static public Connection connection;
    static Statement statement;
    static PreparedStatement preparedStatement;
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
        sql = "INSERT INTO \"fellas\".\"User\" (Name, Address, Email, Password) VALUES (?, ?, ?, ?);";
        
        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(0, newUser.getName());
            preparedStatement.setString(1, newUser.getAddress());
            preparedStatement.setString(2, newUser.getEmail());
            preparedStatement.setString(3, newUser.getPassword());

        preparedStatement.executeUpdate(sql);
    }

    public void User_UPDATE(User newUser) throws Exception {
        sql = "UPDATE \"fellas\".\"User\" SET Name = ?, Address = ?, Email = ?, Password = ? WHERE User_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(0, newUser.getName());
            preparedStatement.setString(1, newUser.getAddress());
            preparedStatement.setString(2, newUser.getEmail());
            preparedStatement.setString(3, newUser.getPassword());
            preparedStatement.setString(4, newUser.getUserID());

        preparedStatement.executeUpdate(sql);
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

    public void Product_INSERT(Product newProduct) throws Exception {
        sql = "INSERT INTO \"fellas\".\"Product\" (Name, Description, Price, Image) VALUES (?, ?, ?, ?);";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(0, newProduct.getName());
            preparedStatement.setString(1, newProduct.getDescription());
            preparedStatement.setDouble(2, newProduct.getPrice());
            preparedStatement.setBytes(3, newProduct.getImage());
        
        preparedStatement.executeUpdate(sql);
    }

    public void Product_UPDATE(Product newProduct) throws Exception {
        sql = "UPDATE \"fellas\".\"Product\" SET Name = ?, Description = ?, Price = ?, Image = ? WHERE Product_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(0, newProduct.getName());
            preparedStatement.setString(1, newProduct.getDescription());
            preparedStatement.setDouble(2, newProduct.getPrice());
            preparedStatement.setBytes(3, newProduct.getImage());
            preparedStatement.setString(4, newProduct.getProductID());
        
        preparedStatement.executeUpdate(sql);
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
            preparedStatement.setString(0, newOrder.getUserID());
            preparedStatement.setDouble(1, newOrder.getTotalPrice());

        preparedStatement.executeUpdate(sql);
    }

    public void Order_UPDATE(Order newOrder) throws Exception {
        sql = "UPDATE \"fellas\".\"Order\" SET User_ID = ?, Total_Price = ? WHERE Order_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(0, newOrder.getUserID());
            preparedStatement.setDouble(1, newOrder.getTotalPrice());
            preparedStatement.setString(2, newOrder.getOrderID());

        preparedStatement.executeUpdate(sql);
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
            preparedStatement.setString(0, newInvoice.getOrderID());
            preparedStatement.setString(1, newInvoice.getProductID());
            preparedStatement.setInt(2, newInvoice.getQuantity());
            preparedStatement.setDouble(3, newInvoice.getPrice());

        preparedStatement.executeUpdate(sql);
    }

    public void Invoice_UPDATE(Invoice newInvoice) throws Exception {
        sql = "UPDATE \"fellas\".\"Invoice\" SET Order_ID = ?, Product_ID = ?, Quantity = ?, Price = ? WHERE Invoice_ID = ?;";

        preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(0, newInvoice.getOrderID());
            preparedStatement.setString(1, newInvoice.getProductID());
            preparedStatement.setInt(2, newInvoice.getQuantity());
            preparedStatement.setDouble(3, newInvoice.getPrice());
            preparedStatement.setString(4, newInvoice.getInvoiceID());

        preparedStatement.executeUpdate(sql);
    }

    public void Invoice_DELETE(String InvoiceID) throws Exception {
        sql = "DELETE FROM \"fellas\".\"Invoice\" WHERE Invoice_ID = '" + InvoiceID + "';";
        statement.executeUpdate(sql);
    }
}