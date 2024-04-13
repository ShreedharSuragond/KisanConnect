package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.ProductDetails;
import com.example.demo.repository.ProductDetailsRepository;

@Service
public class ProductDetailService {

    @Autowired
    private ProductDetailsRepository productRepository;

    public ProductDetails saveProduct(ProductDetails product) {
        return productRepository.save(product);
    }

    public Iterable<ProductDetails> getProductDetails(){
        return productRepository.findAll();
    }

    public List<ProductDetails> getProductDetailsByIds(List<Long> productIds) {
        return (List<ProductDetails>) productRepository.findAllById(productIds);
    }
    
    public ProductDetails getProductDetailsById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProducts(List<ProductDetails> products) {
        productRepository.deleteAll(products);
    }
    
}
