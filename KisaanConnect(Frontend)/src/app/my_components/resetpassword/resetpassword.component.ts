import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register.model';
import { ResetpasswordService } from 'src/app/service/resetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']

})
export class ResetpasswordComponent implements OnInit {

  constructor(private _resetpasswordservice: ResetpasswordService, private _router: Router) { }

  ngOnInit(): void {
  }


  user = new Register();

  otpSubmitted: boolean = false;
  otpVerified: boolean = false;
  confirmPassword: string = '';
  contact: string='';


  submitEmail() {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.contact)) {
      this.user.email = this.contact;
      console.log("email entered: " + this.user.email);
    }
    else if ( /^\+(?:[0-9] ?){6,14}[0-9]$/.test(this.contact)) {
      this.user.mobile = this.contact;
      console.log("mobile entered: " + this.user.mobile);
    }
    else {
      alert("Invalid input. Please enter a valid email or mobile number.");
      return;
    }
    this._resetpasswordservice.submitEmailORMObile(this.user).subscribe(
      (response: any) => {
        if (response && response.status === "success") {
          console.log("OTP sent successfully");
          window.alert("OTP sent successfully to: " + this.user.email);
          this.otpSubmitted = true;
        } else if (response && response.status === "failure") {
          console.log("your Credentials not present");
          window.alert("your Credentials not present");
          this.user = new Register();
        } else {
          console.log("Failed to send OTP");
          window.alert("Failed to send OTP. Please try again later.");
          this.user = new Register();
        }
      },
      (error) => {
        console.error("Error:", error)
        window.alert("An error occurred. Please try again later.");
        this.user = new Register();
      }
    );
  }

  submitOtp() {
    this._resetpasswordservice.submitOtp(this.user).subscribe(
      (response) => {
        if (response && response.status === "success") {
          console.log("OTP verified Successfully");
          window.alert("OTP verified Successfully");
          this.otpVerified = true;
        } else if (response && (response.status === "failure")) {
          console.log("Invalid OTP. Please try again");
          window.alert("Invalid OTP. Please try again");
          this.otpSubmitted = false;
          this.otpVerified = false;
          this.user = new Register();
        } else {
          console.log("Failed to verify OTP. Please try again.");
          window.alert("Failed to verify OTP. Please try again.");
          this.otpSubmitted = false;
          this.otpVerified = false;
          this.user = new Register();
        }
        this.user.otp='';
      },
      (error) => {
        console.error("Error:", error);
        window.alert("An error occurred. Please try again later.");
        this.otpSubmitted = false;
        this.otpVerified = false;
        this.user = new Register();
      }

    );
  }

  resetpassword() {
    if(this.user.password !== this.confirmPassword){
          console.log("check the password");
          window.alert("password does not match. Please try again");
          return;
        }
        this._resetpasswordservice.resetpassword(this.user).subscribe(
          (response) => {
            if (response && response.status === "success") {
              console.log("Reset Password Successfully");
              window.alert("Reset Password Successfully, Now you can Login");
              this._router.navigate(['/login']);
              this.user = new Register();
            } else if (response && (response.status === "failure")) {
              console.log("cann't reset password");
              window.alert("cann't reset password");
              this.otpSubmitted = false;
              this.otpVerified = false;
              this.user = new Register();
            }
          },
          (error) => {
            console.error("Error:", error);
            window.alert("An error occurred. Please try again later.");
            this.otpSubmitted = false;
            this.otpVerified = false;
            this.user = new Register();
          }
        );
  }

}
