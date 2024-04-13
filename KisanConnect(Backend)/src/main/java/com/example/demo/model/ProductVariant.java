package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Product_variants")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String variant;

    private int quantity;

    private double price;

    private double discount;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private ProductDetails product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public ProductDetails getProduct() {
        return product;
    }

    public void setProduct(ProductDetails product) {
        this.product = product;
    }

    public ProductVariant(Long id, String variant, int quantity, double price, double discount,
            ProductDetails product) {
        this.id = id;
        this.variant = variant;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.product = product;
    }

    public ProductVariant() {
        super();
    }

    @Override
    public String toString() {
        return "ProductVariant [id=" + id + ", variant=" + variant + ", quantity=" + quantity + ", price=" + price
                + ", discount=" + discount + ", product=" + product + "]";
    }

    
}
