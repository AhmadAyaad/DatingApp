import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servcies/user.service';
import { IUser } from '../_models/IUser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
