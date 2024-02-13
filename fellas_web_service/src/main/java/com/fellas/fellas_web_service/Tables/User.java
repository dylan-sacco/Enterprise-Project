package com.fellas.fellas_web_service.Tables;

public class User {
    private String User_ID;
    private String Name;
    private String Address;
    private String Email;
    private String Password;

    public User(String User_ID, String Name, String Address, String Email, String Password){
        this.User_ID = User_ID;
        this.Name = Name;
        this.Address = Address;
        this.Email = Email;
        this.Password = Password;
    }
    public User(){
        this.User_ID = "";
        this.Name = "";
        this.Address = "";
        this.Email = "";
        this.Password = "";
    }

    public String getUserID(){ return User_ID; }
    public String getName(){ return Name; }
    public String getAddress(){ return Address; }
    public String getEmail(){ return Email; }
    public String getPassword(){ return Password; }

    public void setUserID(String User_ID){ this.User_ID = User_ID; }
    public void setName(String Name){ this.Name = Name; }
    public void setAddress(String Address){ this.Address = Address; }
    public void setEmail(String Email){ this.Email = Email; }
    public void setPassword(String Password){ this.Password = Password; }
}
