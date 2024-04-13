import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';


const NAV_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private _Http: HttpClient) { }

  submitEmailORMObile(user: Register) {
    return this._Http.post<any>(`${NAV_URL}/send-otp`, user);
  }

  submitOtp(user: Register) {
    return this._Http.post<any>(`${NAV_URL}/verify-otp`, user);
  }

  resetpassword(user: Register) {
    return this._Http.post<any>(`${NAV_URL}/submit-NewPassword`, user)
  }

}

