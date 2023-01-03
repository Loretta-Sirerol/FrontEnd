import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  readonly URL = "https://evil-sacha-loretta-sirerol.koyeb.app/person"

  constructor(private http: HttpClient) { }

  public getPerson(): Observable<Person>
  {
    return this.http.get<Person>(this.URL + "/get/profile")
  }
}
