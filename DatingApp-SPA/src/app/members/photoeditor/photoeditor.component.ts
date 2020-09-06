import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPhoto } from 'src/app/_models/IPhoto';
import { FileUploader } from 'ng2-file-upload';
import { baseUrl } from 'config/api';
import { LoginService } from 'src/app/_servcies/login.service';
import { UserService } from 'src/app/_servcies/user.service';
import { AlertifyService } from '_services/alertify.service';

@Component({
  selector: 'app-photoeditor',
  templateUrl: './photoeditor.component.html',
  styleUrls: ['./photoeditor.component.css'],
})
export class PhotoeditorComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  currentMainPhoto: IPhoto;

  @Input() photos: IPhoto[];
  @Output() mainPhotoChanged = new EventEmitter<string>();

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        baseUrl + 'users/' + this.loginService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: IPhoto = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        if(res.isMain)
        {
          // this.mainPhotoChanged.emit(photo.url);
            this.loginService.changeMemberPhoto(res.url);
            this.loginService.currentUser.photoUrl = res.url;
            localStorage.setItem("user", JSON.stringify(this.loginService.currentUser));
        }
        this.photos.push(photo);
     
      }
    };
  }
  setMainPhoto(photo) {
    this.userService
      .updateUserPhoto(this.loginService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMainPhoto = this.photos.filter(
            (p) => p.isMain === true
          )[0];
    
          this.currentMainPhoto.isMain = false;
          console.log(this.currentMainPhoto);
          photo.isMain = true;
    
          // this.mainPhotoChanged.emit(photo.url);
    
          // hna 3shan n3ml update ll photo we kol el subscribers ll subject
          // y7so bl change fe ysm3 benhom
          this.loginService.changeMemberPhoto(photo.url);
          
          //3shan n3ml update ll value bta3t el url fl local storage
      
          this.loginService.currentUser.photoUrl= photo.url;
          localStorage.setItem('user',JSON.stringify(this.loginService.currentUser));
  
          this.alertifyService.success('update success');
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }


  deletePhoto(photoId)
  {
    this.alertifyService.confirm("Are you sure you want to delete this photo", ()=>{
      this.userService.deletePhoto(photoId, this.loginService.decodedToken.nameid).subscribe(()=>{
        this.photos.splice(this.photos.findIndex(p=>p.id === photoId) , 1);
        this.alertifyService.success("photo removed successfuly");
      },error=>{
        this.alertifyService.error('can not delete photo');
      })
    })
  }

}
