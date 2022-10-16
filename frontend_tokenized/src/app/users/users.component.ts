import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

  deleteUser(id: number) {
    console.log("Delete user");
    this.apiService.deleteUser(id).subscribe(res => {
      console.log('User deleted!');
      this.router.navigateByUrl('/users');
    });
  }

}
