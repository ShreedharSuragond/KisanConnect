package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.twilio.Twilio;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ResetPasswordService {

    @Value("${spring.mail.username}")
    private String sourceEmail;

    @Value("${spring.mail.password}")
    private String sourcePassword;

    public void sendEmail(String toEmail, String subject, String body) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sourceEmail, sourcePassword);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(sourceEmail));
        message.setRecipients(
                Message.RecipientType.TO,
                InternetAddress.parse(toEmail)
        );
        message.setSubject(subject);
        message.setText(body);
        Transport.send(message);
    }


    @Value("${twilio.account_sid}")
    private String accountSid;

    @Value("${twilio.auth_token}")
    private String authToken;

    @Value("${twilio.phone_number}")
    private String fromPhoneNumber;

    public void sendSMS(String toPhoneNumber, Integer otp) {
        Twilio.init(accountSid, authToken);

        com.twilio.rest.api.v2010.account.Message message = com.twilio.rest.api.v2010.account.Message.creator(
                new PhoneNumber(toPhoneNumber),
                new PhoneNumber(fromPhoneNumber),
                "Your OTP is: " + otp)
                .create();

        System.out.println("Message SID: " + message.getSid());
    }





    
    private final Map<String, Integer> otpMap = new HashMap<>();

    public void storeOtp(String email, Integer otp) {
        otpMap.put(email, otp);
    }

    public Integer getOtp(String email) {
        return otpMap.get(email);
    }
    
    public void removeOtp(String email) {
        otpMap.remove(email);
    }

    
}

