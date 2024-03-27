package com.fellas.fellas_web_service.Tables;

public class Cart {
    private String Checkout_ID;
    private String User_ID;
    private String Product_ID;
    private int Quantity;

    public Cart(String Checkout_ID, String User_ID, String Product_ID, int Quantity){
        this.Checkout_ID = Checkout_ID;
        this.User_ID = User_ID;
        this.Product_ID = Product_ID;
        this.Quantity = Quantity;
    }
    public Cart(){
        this.Checkout_ID = "";
        this.User_ID = "";
        this.Product_ID = "";
        this.Quantity = 0;
    }

    public String getCheckoutID(){ return Checkout_ID; }
    public String getUserID(){ return User_ID; }
    public String getProductID(){ return Product_ID; }
    public int getQuantity(){ return Quantity; }

    public void setCheckoutID(String Checkout_ID){ this.Checkout_ID = Checkout_ID; }
    public void setUserID(String User_ID){ this.User_ID = User_ID; }
    public void setProductID(String Product_ID){ this.Product_ID = Product_ID; }
    public void setQuantity(int Quantity){ this.Quantity = Quantity; }
}