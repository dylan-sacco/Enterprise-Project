package com.fellas.fellas_web_service.FillDatabase;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
//import java.io.FileReader;
import java.io.IOException;
import java.util.*;

import com.fellas.fellas_web_service.DatabaseConnection;
import com.fellas.fellas_web_service.Tables.Product;

public class FillProducts {
    static DatabaseConnection database_connection = new DatabaseConnection();
    public static List<Product> products = new ArrayList<Product>();
    public static void main(String[] args) {
        fillProducts();
        InsertProducts();

        //products_toString();
    }

    private static void InsertProducts(){
        //Insert products into database
        try {
			for (Product product_ : products){
				database_connection.Product_INSERT(product_);
			}
		} 
		catch (Exception e) {
			System.out.println(e);
		}
    }

    private static void fillProducts(){
        String filePath = "C:/Users/Joey/Desktop/Enterprise-Project/fellas_web_service/src/main/java/com/fellas/fellas_web_service/FillDatabase/NewProductsInfo.txt";
        File file = new File(filePath);
        
        try{
            //FileReader fileReader = new FileReader(filePath);
            Scanner scanner = new Scanner(file);
            String line;

            while(scanner.hasNextLine()){
                line = scanner.nextLine();
                String[] productInfo = line.split(" --- ");
                //System.out.println(productInfo[0] + " " + productInfo[1] + " " + productInfo[2] + " " + productInfo[3] + " " + productInfo[4]);

                Product product = new Product(productInfo[0], productInfo[1], Double.parseDouble(productInfo[2]), convertImageToByteArray(productInfo[3]));
                products.add(product);
            }

            scanner.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    private static byte[] convertImageToByteArray(String filePath) throws IOException {
        // Replace "path/to/your/image.jpg" with the actual path to your image file
        File imageFile = new File(filePath);

        // Read the image file into a BufferedImage
        BufferedImage bufferedImage = ImageIO.read(imageFile);

        // Convert BufferedImage to byte array
        byte[] imageBytes = convertImageToByteArray(bufferedImage);

        // Now, 'imageBytes' contains the byte representation of the image
        /*System.out.println("Image converted to byte array successfully.");
        for (byte b : imageBytes) {
            System.out.print(b + " ");
        }*/

        return imageBytes;
    }

    private static byte[] convertImageToByteArray(BufferedImage image) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    public static void products_toString(){
        for(Product product : products){
            System.out.println(product.getProductID() + "\n" + product.getName() + "\n" + product.getDescription() + "\n" + product.getPrice() + "\n" + product.getImage());
        }
    }
}