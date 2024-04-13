import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collapse, Dropdown, Input, initMDB } from 'mdb-ui-kit';

import { Register } from 'src/app/model/register.model';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _registerService : RegisterService, private _router : Router) { }

  ngOnInit(): void {
    initMDB({ Input, Dropdown, Collapse });
  }

  user =new Register();

  registerUser()
  {
      this._registerService.registeruser(this.user).subscribe(
      data => {
        console.log("Registration Success");
        this._router.navigate(['/registrationsuccess']);
      },
      error => {
        console.log("Registration Failed");
        console.log(error.error);
      }
    )
  }

}
