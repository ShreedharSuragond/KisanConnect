import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Register } from '../model/register.model';

const NAV_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private _Http: HttpClient) { }

  public loginuser(login: Register) {
    return this._Http.post<any>(`${NAV_URL}/loginuser`, login).pipe(
      map(
        data => {
          return data;
        }
      )
    );
  }

}
