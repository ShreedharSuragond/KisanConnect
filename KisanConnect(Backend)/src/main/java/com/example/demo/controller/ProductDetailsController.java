package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ProductDetails;
import com.example.demo.service.ProductDetailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class ProductDetailsController {

    @Autowired
    private ProductDetailService productService;

    @PostMapping("/products")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createProduct(@RequestBody ProductDetails product) {
        ProductDetails existproduct = productService.getProductDetailsById(product.getId());
        if (existproduct == null) {
            productService.saveProduct(product);
            return ResponseEntity.ok().body("{\"status\": \"Product added successfully\"}");
        } else {
            return ResponseEntity.ok().body("{\"status\": \"Product already exists\"}");
        }
    }

    @GetMapping("/products/details")
    @CrossOrigin(origins = "http://localhost:4200")
    public Iterable<ProductDetails> getProductDetails() {
        return productService.getProductDetails();
    }

    @PostMapping("/products/delete")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<String> deleteProducts(@RequestBody List<Long> productIds) {
        try {
            List<ProductDetails> products = productService.getProductDetailsByIds(productIds);
            if (products.size() == productIds.size()) {
                productService.deleteProducts(products);
                return ResponseEntity.ok("{\"status\": \"Product deleted successfully\"}");
            } else {
                return ResponseEntity.badRequest().body("{\"status\": \"One or more product IDs are invalid\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting products: " + e.getMessage());
        }
    }

    @PutMapping("/products/{productId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductDetails updatedProduct) {
        ProductDetails existingProduct = productService.getProductDetailsById(productId);
        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }
        // Update existing product with new details
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setCompany(updatedProduct.getCompany());
        existingProduct.setImage(updatedProduct.getImage());
        existingProduct.setContent(updatedProduct.getContent());
        existingProduct.setFeatures(updatedProduct.getFeatures());
        existingProduct.setUsage(updatedProduct.getUsage());
        existingProduct.setCrops(updatedProduct.getCrops());
        existingProduct.setTimeOfApplication(updatedProduct.getTimeOfApplication());
        existingProduct.setDosage(updatedProduct.getDosage());

        existingProduct.getProductVariants().clear(); // Clear existing collection if needed
        existingProduct.getProductVariants().addAll(updatedProduct.getProductVariants());

        productService.saveProduct(existingProduct);
        return ResponseEntity.ok("{\"status\": \"Product updated successfully\"}");
    }
    
    @GetMapping("/product/details/{productId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> getProductsDetailsByID(@PathVariable("productId") Long productId){
    	ProductDetails product=productService.getProductDetailsById(productId);
    	if(product!=null) {
    		return ResponseEntity.ok(product);
    	}
    	else {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    	}
    }
}
