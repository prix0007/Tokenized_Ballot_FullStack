import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users/user';
import { UserForm } from '../users/userForm';
import { Contract } from '../contracts/contract';
import { Claim } from '../claims/claim';
import { ClaimForm } from '../claims/claimForm';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_API: string;

  constructor(private http: HttpClient) {
    this.BASE_API = 'http://5.255.101.45:3000';
  }

  private formEndPoint(endpoint: string): string {
    return this.BASE_API + endpoint;
  }

  getClaims() {
    return this.http.get<Claim[]>(this.formEndPoint('/claims'));
  }

  getContracts() {
    return this.http.get<Contract[]>(this.formEndPoint('/contract'));
  }

  getUsers() {
    return this.http.get<User[]>(this.formEndPoint('/users'));
  }

  createUser(user: UserForm) {
    return this.http.post<User>(this.formEndPoint('/users'), user);
  }

  createClaim(claim: ClaimForm) {
    return this.http.post<Claim>(
      this.formEndPoint('/users/createClaim'),
      claim
    );
  }

  deleteUser(id: number) {
    return this.http.delete<User>(this.formEndPoint(`/users/${id}`));
  }

  claimToken(id: number, signature: string) {
    const body = { claimId: id, signature: signature };
    return this.http.post<User>(this.formEndPoint(`/users/claim`), body);
  }
}
