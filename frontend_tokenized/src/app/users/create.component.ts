import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ){
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: ['']
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createUser(this.userForm.value).subscribe(res => {
      console.log('User created!');
      this.router.navigateByUrl('/users');
    });
  }
}
