import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor( private http: HttpClient ) {
  }

  getClaims(){
    return this.http.get("http://5.255.101.45:3000/claims");
  }
}
