import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users/user'
import { UserForm } from '../users/userForm'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor( private http: HttpClient ) {
  }

  getClaims(){
    return this.http.get("http://5.255.101.45:3000/claims");
  }

  getContracts(){
    return this.http.get("http://5.255.101.45:3000/contract");
  }

  getUsers(){
    return this.http.get<User[]>("http://5.255.101.45:3000/users");
  }

  createUser(user: UserForm){
    return this.http.post<User[]>("http://5.255.101.45:3000/users", user);
  }

  deleteUser(id: number){
    return this.http.get<User[]>(`http://5.255.101.45:3000/users/${id}`);
  }
}
