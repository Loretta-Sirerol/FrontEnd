import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUserName";
const AUTHORITIES_KEY = "AuthAuthorities";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<String>;
  
  constructor() { this.roles = [] }

  public setToken(token: String): void
  {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token.toString());
  }

  public getToken(): String
  {
   return sessionStorage.getItem(TOKEN_KEY) as String; 
  }

  public setUserName(userName: String): void
  {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName.toString());
  }

  public getUserName(): String
  {
   return sessionStorage.getItem(USERNAME_KEY) as String; 
  }

  public setAuthorities(authorities: Array<String>): void
  {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities)); 
  }

  public getAuthorities(): Array<String>
  {
    if(sessionStorage.getItem(AUTHORITIES_KEY))
    {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((element:any) => {
                this.roles.push(element.authorities);
      });
    }
    return this.roles;
  }

  public logOut(): void
  {
    window.sessionStorage.clear();
  }

}
