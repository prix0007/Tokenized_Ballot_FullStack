import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users/user'
import { UserForm } from '../users/userForm'
import { Contract } from '../contracts/contract'
import { Claim } from '../claims/claim'
import { ClaimForm } from '../claims/claimForm'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor( private http: HttpClient ) {
  }

  getClaims(){
    return this.http.get<Claim[]>("http://5.255.101.45:3000/claims");
  }

  getContracts(){
    return this.http.get<Contract[]>("http://5.255.101.45:3000/contract");
  }

  getUsers(){
    return this.http.get<User[]>("http://5.255.101.45:3000/users");
  }

  createUser(user: UserForm){
    return this.http.post<User>("http://5.255.101.45:3000/users", user);
  }

  createClaim(claim: ClaimForm){
    return this.http.post<Claim>("http://5.255.101.45:3000/users/createClaim", claim);
  }

  deleteUser(id: number){
    return this.http.delete<User>(`http://5.255.101.45:3000/users/${id}`);
  }

  claimToken(id: number, signature: string){
    const body = { claimId: id, signature: signature };
    return this.http.post<User>(`http://5.255.101.45:3000/users/claim`, body);
  }
}
