import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servcies/user.service';
import { IUser } from '../_models/IUser';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
