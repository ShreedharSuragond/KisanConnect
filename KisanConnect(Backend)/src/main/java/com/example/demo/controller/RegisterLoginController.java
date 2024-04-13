package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.RegisterLogin;
import com.example.demo.service.RegisterLoginService;

@RestController
public class RegisterLoginController {
	@Autowired
	private RegisterLoginService regloginservice;
	
	@PostMapping("/registeruser")
	@CrossOrigin(origins = "http://localhost:4200")
	public RegisterLogin registerUser(@RequestBody RegisterLogin user) throws Exception
	{
		String currEmail = user.getEmail();
		
		if (currEmail != null && !"".equals(currEmail)) {

			if (regloginservice == null) {
	            throw new Exception("RegisterLoginService is not initialized");  
	        }

	        RegisterLogin userObj = regloginservice.fetchUserByEmail(currEmail);
	        if (userObj != null) {
	            throw new Exception("User with " + currEmail + " already exists !!!");
	        }
	    }
		
		return regloginservice.saveUser(user);
	}
	
	@PostMapping("/loginuser")
	@CrossOrigin(origins = "http://localhost:4200")
	public RegisterLogin loginUser(@RequestBody RegisterLogin user) throws Exception
	{
		String currEmail = user.getEmail();
		String currPassword = user.getPassword();
		
		RegisterLogin userObj = null;
		if(currEmail != null && currPassword != null)
		{
			userObj = regloginservice.fetchByEmailAndPassword(currEmail, currPassword);
		}
		if(userObj == null)
		{
			throw new Exception("User does not exists!!! Please enter valid credentials...");
		}		
		return userObj;
	}
}
