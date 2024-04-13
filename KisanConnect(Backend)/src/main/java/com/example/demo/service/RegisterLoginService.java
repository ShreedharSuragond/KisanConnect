package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.RegisterLogin;
import com.example.demo.repository.RegisterLoginRepository;

@Service
public class RegisterLoginService {
	@Autowired
	private RegisterLoginRepository registerloginrepo;
		
	public RegisterLogin saveUser(RegisterLogin user)
	{
		return registerloginrepo.save(user);
	}
	
	public RegisterLogin fetchByEmailAndPassword(String email, String password)
	{
		return registerloginrepo.findByEmailAndPassword(email, password);
	}
	
	public RegisterLogin fetchUserByEmail(String email)
	{
		return registerloginrepo.findByEmail(email);
	}

	public RegisterLogin fetchUserByEmailOrMobile(String email, String mobile){
		return registerloginrepo.findByEmailOrMobile(email, mobile);
	}

	public RegisterLogin fetchUserByMobile(String mobile){
		return registerloginrepo.findByMobile(mobile);
	}

}
