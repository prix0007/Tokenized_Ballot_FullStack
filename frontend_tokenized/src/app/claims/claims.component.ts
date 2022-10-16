import { Component, OnInit } from '@angular/core';
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

}
