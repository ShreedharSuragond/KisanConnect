package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.RegisterLogin;


@Repository
public interface RegisterLoginRepository extends CrudRepository<RegisterLogin, Integer>{

	RegisterLogin findByEmailAndPassword(String email, String password);
	RegisterLogin findByEmail(String email);
    RegisterLogin findByMobile(String mobile);
    RegisterLogin findByEmailOrMobile(String email, String mobile);

}
