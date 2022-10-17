import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  balance: string;
  provider: ethers.providers.BaseProvider | undefined;
  tokenContractAddress: string;

  constructor(private apiService: ApiService) {
    this.walletAddress = 'Loading ....';
    this.balance = 'Loading ....';
    this.tokenContractAddress = ""
  }

  ngOnInit(): void {
  }

  connect(privateKey: string) {
    this.provider = ethers.getDefaultProvider("goerli");
    this.wallet = new ethers.Wallet(privateKey);
    this.walletAddress = this.wallet.address;
  }

}
