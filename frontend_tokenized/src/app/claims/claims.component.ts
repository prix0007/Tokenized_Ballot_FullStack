import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../services/api.service';
import { Claim } from './claim';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {

  claims: Claim[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getClaims().subscribe((data: Claim[]) => {
      this.claims = data;
    });
  }

  async claimToken(id: number, secret: string){
    const hashedMessage = ethers.utils.hashMessage(secret);
    const privateKey = localStorage.getItem("privateKey");
    if(privateKey == null)
      return;
    const wallet = new ethers.Wallet(privateKey);
    console.log("wallet Address: ", wallet.address);
    const signaturedMessage = await wallet.signMessage(hashedMessage)
    console.log("Signature")
    console.log(signaturedMessage);
    this.apiService.claimToken(id, signaturedMessage).subscribe((data) => {
      console.log(data);
    });

  }

  userAddress(): string | null{
    return localStorage.getItem('walletAddress');
  }
}
