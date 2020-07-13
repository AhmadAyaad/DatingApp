import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { IUser } from 'src/app/_models/IUser';
import { AlertifyService } from '_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_servcies/user.service';
import { LoginService } from 'src/app/_servcies/login.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  @ViewChild('editForm') editForm: NgForm;
  user: IUser;
  photoUrl;


  @HostListener('window:beforeunload', ['$event'])
  handleClose($event) {
    if (this.editForm.dirty) $event.returnValue = false;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.user = data['user'];
    });
    this.loginService.currentPhotoUrl.subscribe(url=>this.photoUrl=url);
  }

  updateUser() {
    this.userService
      .updateUser(this.loginService.decodedToken.nameid, this.user)
      .subscribe(
        (res) => {
          console.log(this.user);
          this.alertifyService.success('successfully updated');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
