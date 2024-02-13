package com.fellas.fellas_web_service.Tables;

public class Order {
    private String Order_ID;
    private String User_ID;
    private double Total_Price;

    public Order(String Order_ID, String User_ID, double Total_Price){
        this.Order_ID = Order_ID;
        this.User_ID = User_ID;
        this.Total_Price = Total_Price;
    }
    public Order(){
        this.Order_ID = "";
        this.User_ID = "";
        this.Total_Price = 0;
    }

    public String getOrderID(){ return Order_ID; }
    public String getUserID(){ return User_ID; }
    public double getTotalPrice(){ return Total_Price; }

    public void setOrderID(String Order_ID){ this.Order_ID = Order_ID; }
    public void setUserID(String User_ID){ this.User_ID = User_ID; }
    public void setTotalPrice(double Total_Price){ this.Total_Price = Total_Price; }
}
