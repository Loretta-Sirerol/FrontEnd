import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../model/jwt-dto.model';
import { LoginUser } from '../model/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authURL = "https://evil-sacha-loretta-sirerol.koyeb.app/auth/";
  constructor(private http: HttpClient) { }

  public login(loginUser: LoginUser): Observable<JwtDTO>
  {
    return this.http.post<JwtDTO>(this.authURL + "login", loginUser);
  }

}
