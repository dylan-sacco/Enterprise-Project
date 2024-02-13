package com.fellas.fellas_web_service.Tables;

public class Invoice {
    private String Invoice_ID;
    private String Order_ID;
    private String Product_ID;
    private int Quantity;
    private double Price;

    public Invoice(String Invoice_ID, String Order_ID, String Product_ID, int Quantity, double Price){
        this.Invoice_ID = Invoice_ID;
        this.Order_ID = Order_ID;
        this.Product_ID = Product_ID;
        this.Quantity = Quantity;
        this.Price = Price;
    }
    public Invoice(){
        this.Invoice_ID = "";
        this.Order_ID = "";
        this.Product_ID = "";
        this.Quantity = 0;
        this.Price = 0;
    }

    public String getInvoiceID(){ return Invoice_ID; }
    public String getOrderID(){ return Order_ID; }
    public String getProductID(){ return Product_ID; }
    public int getQuantity(){ return Quantity; }
    public double getPrice(){ return Price; }

    public void setInvoiceID(String Invoice_ID){ this.Invoice_ID = Invoice_ID; }
    public void setOrderID(String Order_ID){ this.Order_ID = Order_ID; }
    public void setProductID(String Product_ID){ this.Product_ID = Product_ID; }
    public void setQuantity(int Quantity){ this.Quantity = Quantity; }
    public void setPrice(double Price){ this.Price = Price; }
}
