import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../_models/IUser';
import { usersUrl, baseUrl } from 'config/api';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token'),
//   }),
// };
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(usersUrl);
  }
  getUser(id): Observable<IUser> {
    return this.http.get<IUser>(usersUrl + '/' + id);
  }

  updateUser(id, user) {
    return this.http.put(usersUrl + '/' + id, user);
  }

  updateUserPhoto(userId, photoId) {
    return this.http.patch(
      baseUrl + 'users/' + userId + '/photos/' + photoId + '/setmain',
      {}
    );
  }

  deletePhoto(photoid , userId)
  {
    return this.http.delete(baseUrl+'users/'+userId+'/photos/'+photoid);
  }
  
}
