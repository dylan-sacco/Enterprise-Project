package com.fellas.fellas_web_service;

import java.util.ArrayList;
import java.util.List;
import com.fellas.fellas_web_service.Tables.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
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
    static List<Cart>     carts     =  new ArrayList<Cart>();

	static Gson gson = new GsonBuilder().setPrettyPrinting().create();

	private final String valid_authorization = "Amdin:Password";




//-------------------------------------------Users Methods---------------------------------------------
	@GetMapping("/user")
	public ResponseEntity<List<User>> getUser(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "UserId", required = false) String UserID) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/user")
	public ResponseEntity<User> postUser(@RequestHeader("Authorization") String authorization_header, @RequestBody User user) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/user")
	public ResponseEntity<User> putUser(@RequestHeader("Authorization") String authorization_header, @RequestBody User user) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/user")
	public ResponseEntity<User> deleteUser(@RequestHeader("Authorization") String authorization_header, @RequestParam String UserID) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}



//-------------------------------------------Products Methods-------------------------------------------
	@GetMapping("/product")
	public ResponseEntity<List<Product>> getProduct(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "ProductId", required = false) String ProductID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/product")
	public ResponseEntity<Product> postProduct(@RequestHeader("Authorization") String authorization_header, @RequestBody Product product) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/product")
	public ResponseEntity<Product> putProduct(@RequestHeader("Authorization") String authorization_header, @RequestBody Product product) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/product")
	public ResponseEntity<Product> deleteProduct(@RequestHeader("Authorization") String authorization_header, @RequestBody Product product) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}



//-------------------------------------------Orders Methods---------------------------------------------
	@GetMapping("/order")
	public ResponseEntity<List<Order>> getOrder(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "OrderId", required = false) String OrderID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/order")
	public ResponseEntity<Order> postOrder(@RequestHeader("Authorization") String authorization_header, @RequestBody Order order) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/order")
	public ResponseEntity<Order> putOrder(@RequestHeader("Authorization") String authorization_header, @RequestBody Order order) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/order")
	public ResponseEntity<Order> deleteOrder(@RequestHeader("Authorization") String authorization_header, @RequestBody Order order) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}



//-------------------------------------------Invoices Methods-------------------------------------------
	@GetMapping("/invoice")
	public ResponseEntity<List<Invoice>> getInvoice(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "InvoiceId", required = false) String InvoiceID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/invoice")
	public ResponseEntity<Invoice> postInvoice(@RequestHeader("Authorization") String authorization_header, @RequestBody Invoice invoice) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/invoice")
	public ResponseEntity<Invoice> putInvoice(@RequestHeader("Authorization") String authorization_header, @RequestBody Invoice invoice) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/invoice")
	public ResponseEntity<Invoice> deleteInvoice(@RequestHeader("Authorization") String authorization_header, @RequestBody Invoice invoice) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}



//-------------------------------------------Cart Methods-----------------------------------------------
	@GetMapping("/cart")
	public ResponseEntity<List<Cart>> getCart(@RequestHeader("Authorization") String authorization_header, @RequestParam(value = "CartId", required = false) String CartID){
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PostMapping("/cart")
	public ResponseEntity<Cart> postCart(@RequestHeader("Authorization") String authorization_header, @RequestBody Cart cart) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@PutMapping("/cart")
	public ResponseEntity<Cart> putCart(@RequestHeader("Authorization") String authorization_header, @RequestBody Cart cart) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/cart")
	public ResponseEntity<Cart> deleteCart(@RequestHeader("Authorization") String authorization_header, @RequestBody Cart cart) {
		if(!user_authenticated(authorization_header)){
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
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