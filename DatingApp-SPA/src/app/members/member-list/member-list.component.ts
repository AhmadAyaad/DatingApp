import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_servcies/user.service';
import { IUser } from '../../_models/IUser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: IUser[];

  constructor(private userService: UserService , private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
   this.activatedRoute.data.subscribe((data)=>{
     this.users = data['users'];
   });
    // this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users:IUser[]) => {
      this.users = users;
      // console.log(users);
    });
  }
}
