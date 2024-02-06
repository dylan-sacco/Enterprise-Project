package com.fellas.fellas_web_service;

import com.fellas.fellas_web_service.Tables.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
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

        return "";
    }

    public String User_SELECT(String UserID) throws Exception {

        return "";
    }

    public void User_INSERT(User newUser) throws Exception {

    }

    public void User_UPDATE(User newUser) throws Exception {

    }

    public void User_DELETE(String UserID) throws Exception {

    }
//-------------------------------------------Products Methods------------------------------------------
    public String Product_SELECT() throws Exception {

        return "";
    }

    public String Product_SELECT(String ProductID) throws Exception {

        return "";
    }

    public void Product_INSERT(Product newProduct) throws Exception {

    }

    public void Product_UPDATE(Product newProduct) throws Exception {

    }

    public void Product_DELETE(String ProductID) throws Exception {

    }
//-------------------------------------------Orders Methods--------------------------------------------
    public String Order_SELECT() throws Exception {

        return "";
    }

    public String Order_SELECT(String OrderID) throws Exception {

        return "";
    }

    public void Order_INSERT(Order newOrder) throws Exception {

    }

    public void Order_UPDATE(Order newOrder) throws Exception {

    }

    public void Order_DELETE(String OrderID) throws Exception {

    }
//-------------------------------------------Invoices Methods------------------------------------------
    public String Invoice_SELECT() throws Exception {

        return "";
    }

    public String Invoice_SELECT(String InvoiceID) throws Exception {

        return "";
    }

    public void Invoice_INSERT(Invoice newInvoice) throws Exception {

    }

    public void Invoice_UPDATE(Invoice newInvoice) throws Exception {

    }

    public void Invoice_DELETE(String InvoiceID) throws Exception {

    }
}