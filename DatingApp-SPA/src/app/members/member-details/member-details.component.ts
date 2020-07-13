import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_servcies/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/_models/IUser';
import { AlertifyService } from '_services/alertify.service';
// import {
//   NgxGalleryOptions,
//   NgxGalleryImage,
//   NgxGalleryAnimation,
// } from 'ngx-gallery';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from 'ngx-gallery-9';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  user: IUser;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    // this.getUser();
    this.activatedRoute.data.subscribe((data) => {
      console.log(data['interests']);
      this.user = data['user'];
      console.log(this.user);
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }
  getImages() {
    const imagesUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imagesUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].url,
      });
    }
    return imagesUrls;
  }

  // getUser() {
  //   this.userService
  //     // plus here to convert string (id) to number
  //     .getUser(+this.activatedRoute.snapshot.params['id'])
  //     .subscribe(
  //       (user: IUser) => {
  //         this.user = user;
  //       },
  //       (error) => {
  //         this.alertifyService.error(error);
  //       }
  //     );
  // }
}
