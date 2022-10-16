import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Contract } from './contract';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getContracts().subscribe((data: Contract[]) => {
      this.contracts = data;
    });
  }

}
