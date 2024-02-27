package com.fellas.fellas_web_service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fellas.fellas_web_service.Tables.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@SpringBootApplication
@RestController
public class FellasWebServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FellasWebServiceApplication.class, args);
	}

	static DatabaseConnection database_connection = new DatabaseConnection();

	static List<User>     users     =  new ArrayList<User>();
    static List<Product>  products  =  new ArrayList<Product>();
    static List<Order>    orders    =  new ArrayList<Order>();
    static List<Invoice>  invoices  =  new ArrayList<Invoice>();

	static Gson gson = new GsonBuilder().setPrettyPrinting().create();

	private final String valid_authorization = "Admin:Password";




//-------------------------------------------Users Methods---------------------------------------------
	@GetMapping("/user")
	public ResponseEntity<List<User>> getUser(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "UserId", required = false) String UserID) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		String json = "";
		
		try {
			if(UserID == null){
				json = database_connection.User_SELECT();
			}
			else{
				json = database_connection.User_SELECT(UserID);
			}

			if(json == null){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			else{
				users = Arrays.asList(gson.fromJson(json, User[].class));

				return new ResponseEntity<List<User>>(users, HttpStatus.OK);
			}
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/user")
	public ResponseEntity<List<User>> postUser(@RequestHeader("Authorization") String authorization_header, @RequestBody String newUser) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		users = Arrays.asList(gson.fromJson(newUser, User[].class));

		try {
			for (User user : users){
				database_connection.User_INSERT(user);
			}

			return new ResponseEntity<>(users, HttpStatus.CREATED);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/user")
	public ResponseEntity<User> putUser(@RequestHeader("Authorization") String authorization_header, @RequestBody String newUser) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		users = Arrays.asList(gson.fromJson(newUser, User[].class));

		try {
			for (User user : users){
				database_connection.User_UPDATE(user);
			}

			return new ResponseEntity<>(users.get(0), HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/user")
	public ResponseEntity<User> deleteUser(@RequestHeader("Authorization") String authorization_header, @RequestParam String UserID) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		try {
			database_connection.User_DELETE(UserID);

			return new ResponseEntity<>(null, HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



//-------------------------------------------Products Methods-------------------------------------------
	@GetMapping("/product")
	public ResponseEntity<List<Product>> getProduct(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "ProductId", required = false) String ProductID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		String json = "";

		try {
			if(ProductID == null){
				json = database_connection.Product_SELECT();
			}
			else{
				json = database_connection.Product_SELECT(ProductID);
			}

			if(json == null){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			else{
				products = Arrays.asList(gson.fromJson(json, Product[].class));

				return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
			}
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/product/image", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getProductImage(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "ProductId", required = true) String ProductID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		byte[] product_image = null;

		try {
			product_image = database_connection.Product_SELECT_Image(ProductID);

			if(product_image == null){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			else{

				return new ResponseEntity<byte[]>(product_image, HttpStatus.OK);
			}
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping("/product")
	public ResponseEntity<Product> postProduct(@RequestHeader("Authorization") String authorization_header, @RequestBody String product) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		products = Arrays.asList(gson.fromJson(product, Product[].class));

		try {
			for (Product product_ : products){
				database_connection.Product_INSERT(product_);
			}

			return new ResponseEntity<>(products.get(0), HttpStatus.CREATED);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/product")
	public ResponseEntity<Product> putProduct(@RequestHeader("Authorization") String authorization_header, @RequestBody String product) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		products = Arrays.asList(gson.fromJson(product, Product[].class));

		try {
			for (Product product_ : products){
				database_connection.Product_UPDATE(product_);
			}

			return new ResponseEntity<>(products.get(0), HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/product")
	public ResponseEntity<Product> deleteProduct(@RequestHeader("Authorization") String authorization_header, @RequestBody Product product) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		try {
			database_connection.Product_DELETE(product.getProductID());

			return new ResponseEntity<>(null, HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



//-------------------------------------------Orders Methods---------------------------------------------
	@GetMapping("/order")
	public ResponseEntity<List<Order>> getOrder(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "OrderId", required = false) String OrderID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		String json = "";

		try {
			if(OrderID == null){
				json = database_connection.Order_SELECT();
			}
			else{
				json = database_connection.Order_SELECT(OrderID);
			}

			if(json == null){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			else{
				orders = Arrays.asList(gson.fromJson(json, Order[].class));

				return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
			}
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/order")
	public ResponseEntity<Order> postOrder(@RequestHeader("Authorization") String authorization_header, @RequestBody String newOrder) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		orders = Arrays.asList(gson.fromJson(newOrder, Order[].class));

		try {
			for (Order order : orders){
				database_connection.Order_INSERT(order);
			}

			return new ResponseEntity<>(orders.get(0), HttpStatus.CREATED);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/order")
	public ResponseEntity<Order> putOrder(@RequestHeader("Authorization") String authorization_header, @RequestBody String newOrder) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		orders = Arrays.asList(gson.fromJson(newOrder, Order[].class));

		try {
			for (Order order : orders){
				database_connection.Order_UPDATE(order);
			}

			return new ResponseEntity<>(orders.get(0), HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/order")
	public ResponseEntity<Order> deleteOrder(@RequestHeader("Authorization") String authorization_header, @RequestBody Order order) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		try {
			database_connection.Order_DELETE(order.getOrderID());

			return new ResponseEntity<>(null, HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



//-------------------------------------------Invoices Methods-------------------------------------------
	@GetMapping("/invoice")
	public ResponseEntity<List<Invoice>> getInvoice(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "InvoiceId", required = false) String InvoiceID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		String json = "";

		try{
			if(InvoiceID == null){
				json = database_connection.Invoice_SELECT();
			}
			else{
				json = database_connection.Invoice_SELECT(InvoiceID);
			}

			if(json == null){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			else{
				invoices = Arrays.asList(gson.fromJson(json, Invoice[].class));

				return new ResponseEntity<List<Invoice>>(invoices, HttpStatus.OK);
			}
		}
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		
		}
	}

	@PostMapping("/invoice")
	public ResponseEntity<Invoice> postInvoice(@RequestHeader("Authorization") String authorization_header, @RequestBody String newInvoice) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		invoices = Arrays.asList(gson.fromJson(newInvoice, Invoice[].class));

		try {
			for (Invoice invoice : invoices){
				database_connection.Invoice_INSERT(invoice);
			}

			return new ResponseEntity<>(invoices.get(0), HttpStatus.CREATED);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/invoice")
	public ResponseEntity<Invoice> putInvoice(@RequestHeader("Authorization") String authorization_header, @RequestBody String newInvoice) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		invoices = Arrays.asList(gson.fromJson(newInvoice, Invoice[].class));

		try {
			for (Invoice invoice : invoices){
				database_connection.Invoice_UPDATE(invoice);
			}

			return new ResponseEntity<>(invoices.get(0), HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/invoice")
	public ResponseEntity<Invoice> deleteInvoice(@RequestHeader("Authorization") String authorization_header, @RequestBody Invoice invoice) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		try {
			database_connection.Invoice_DELETE(invoice.getInvoiceID());

			return new ResponseEntity<>(null, HttpStatus.OK);
		} 
		catch (Exception e) {
			System.out.println(e);

			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}





//-------------------------------------------Authentication Methods-------------------------------------
	private boolean user_authenticated(String authorization_header){
		if (authorization_header != null) {
            //System.out.println("Authorization header: " + authorization_header);
            String[] credentials = decodeAuthorizationHeader(authorization_header);
            if (isValidCredentials(credentials[0], credentials[1])) {
                //System.out.println("User " + credentials[0] + " is authenticated");
                return true;
            }
        }
        return false;
	}

	private String[] decodeAuthorizationHeader(String authHeader) {
        String[] credentials = null;
        String base64Credentials = authHeader.substring(6);
        String credentialsString = new String(java.util.Base64.getDecoder().decode(base64Credentials));
        credentials = credentialsString.split(":", 2);
        return credentials;
    }

    private boolean isValidCredentials(String username, String password) {
        //System.out.println("Validating credentials for " + username + ":" + password);
        boolean isValid = false;

        String[] credentials = valid_authorization.split(":", 2);
        if (credentials[0].equals(username) && credentials[1].equals(password)) {
            isValid = true;
        }

        //System.out.println("Credentials validity: " + isValid);
        return isValid;
    }
}