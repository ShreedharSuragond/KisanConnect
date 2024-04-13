import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../model/register.model';

const NAV_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private _Http:HttpClient) { }

  public registeruser(register:Register):Observable<any>{
    return this._Http.post<any>(`${NAV_URL}/registeruser`,register)
  }

}
