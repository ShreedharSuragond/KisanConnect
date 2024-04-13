package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.ProductVariant;

@Repository
public interface ProductVariantRepository extends CrudRepository<ProductVariant, Long> {

}
