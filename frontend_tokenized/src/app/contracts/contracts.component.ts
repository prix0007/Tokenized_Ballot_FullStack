import { Component, OnInit } from '@angular/core';
import { Provider } from '@ethersproject/abstract-provider';
import { ethers, Contract as EContract } from 'ethers';
import { ApiService } from '../services/api.service';
import { Contract } from './contract';

// const functions = [
//   {
//     get: [
//       { name: 'totalSupply', params: 0, paramType: [] },
//       { name: 'balanceOf', params: 1, paramType: ['string'] },
//       { name: 'allowance', params: 2, paramType: ['string', 'string'] },
//     ],
//   },
//   {
//     get: [
//       { name: 'owner', params: 0, paramType: [] },
//       { name: 'proposals', params: 1, paramType: ['number'] },
//       { name: 'tokenContract', params: 0, paramType: [] },
//       { name: 'referenceBlock', params: 0, paramType: [] },
//       { name: 'votingPower', params: 1, paramType: ['string'] },
//     ],
//   },
// ];

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];
  contractLoaded: boolean;
  activeContract: number;
  eContracts?: EContract[];
  contractStates: any[];
  provider: Provider;

  constructor(private apiService: ApiService) {
    this.contractLoaded = false;
    this.activeContract = 0;
    this.provider = ethers.providers.getDefaultProvider('goerli');
    this.contractStates = [
      {
        totalSupply: 0
      },
      {
        owner: '',
        tokenContract: ''
      }
    ]
  }

  ngOnInit(): void {
    this.apiService.getContracts().subscribe((data: Contract[]) => {
      const parseAbiData = data.map((contract: Contract) => {
        return {
          ...contract,
          abi: JSON.parse(contract.abi),
        };
      });
      this.contracts = parseAbiData;
      //  Loading All Abis on load
      if (parseAbiData.length > 0) {
        this.loadAbis(parseAbiData);
        this.loadERC20TokenContract();
        this.getTotalSupply();
        this.loadTokenziedOwner();
      }
    });
  
  }

  loadAbis(parseAbiData: Contract[]) {
    this.eContracts = parseAbiData.map((contract: Contract) => {
      const provider = this.loadProvider(contract.network);
      return new ethers.Contract(contract.address, contract.abi, provider);
    });
  }

  loadProvider(network: string) {
    return ethers.providers.getDefaultProvider(network);
  }

  async getTotalSupply() {
    if(this.eContracts) {
      let contract = this.eContracts[0];
      const supply = await contract['totalSupply']();
      this.contractStates[0].totalSupply = ethers.utils.formatEther(supply);
    }
  }

  async loadERC20TokenContract() {
    if(this.eContracts) {
      let contract = this.eContracts[1];
      const tokenContract = await contract['tokenContract']();
      console.log(tokenContract);
      this.contractStates[1].tokenContract = tokenContract;
    }
  }

  async loadTokenziedOwner() {
    if(this.eContracts) {
      let contract = this.eContracts[1];
      const owner = await contract['owner']();
      console.log(owner);
      this.contractStates[1].owner = owner;
    }
  }
}
