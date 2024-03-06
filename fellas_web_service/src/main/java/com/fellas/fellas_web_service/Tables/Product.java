package com.fellas.fellas_web_service.Tables;

public class Product {
    private String Product_ID;
    private String Name;
    private String Description;
    private double Price;
    private byte[] Image;

    public Product(String Product_ID, String Name, String Description, double Price, byte[] Image){
        this.Product_ID = Product_ID;
        this.Name = Name;
        this.Description = Description;
        this.Price = Price;
        this.Image = Image;
    }
    public Product(String Name, String Description, double Price, byte[] Image){
        this.Product_ID = "";
        this.Name = Name;
        this.Description = Description;
        this.Price = Price;
        this.Image = Image;
    }
    public Product(){
        this.Product_ID = "";
        this.Name = "";
        this.Description = "";
        this.Price = 0;
        this.Image = null;
    }

    public String getProductID(){ return Product_ID; }
    public String getName(){ return Name; }
    public String getDescription(){ return Description; }
    public double getPrice(){ return Price; }
    public byte[] getImage(){ return Image; }

    public void setProductID(String Product_ID){ this.Product_ID = Product_ID; }
    public void setName(String Name){ this.Name = Name; }
    public void setDescription(String Description){ this.Description = Description; }
    public void setPrice(double Price){ this.Price = Price; }
    public void setImage(byte[] Image){ this.Image = Image; }
}
