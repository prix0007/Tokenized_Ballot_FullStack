import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateClaimComponent implements OnInit {
  claimForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ){
    this.claimForm = this.fb.group({
      amount: [''],
      userId: [''],
      address: [''],
      secret: ['']
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createClaim(this.claimForm.value).subscribe(res => {
      console.log('User created!');
      this.router.navigateByUrl('/claims');
    });
  }
}
