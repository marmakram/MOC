import { Component, OnInit } from '@angular/core';
import { UsersService } from "../services/users.services";
import { UserModel } from '../models/User.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: UserModel[] = [];
  
  constructor(private userService: UsersService) { }

  deleteUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(a => {
      this.getAll();
    });
  }
  ngOnInit() {
    this.getAll();
  }


  private getAll() {
    this.userService.getAllUsers().subscribe(a => {
      debugger;
      this.userList = a.filter(a => a.roles && a.roles.length > 0);
    });
  }
}
