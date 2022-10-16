import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

}
