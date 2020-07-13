import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { from } from 'rxjs';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { NgxGalleryModule } from 'ngx-gallery';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { FileUploadModule } from 'ng2-file-upload';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from '_services/error.interceptor';
import { LoginService } from './_servcies/login.service';
import { AlertifyService } from '_services/alertify.service';
import { DropdownDirective } from './Directives/dropdown.directive';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { routes } from './routes';
import { AtuhGuard } from './_guards/atuh.guard';
import { UserService } from './_servcies/user.service';
import { MembersComponent } from './members/members.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailsResolver } from './_resolvers/member.details.reslover';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent.unsaved.changes';
import { PhotoeditorComponent } from './members/photoeditor/photoeditor.component';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    DropdownDirective,
    MemberListComponent,
    MessagesComponent,
    ListsComponent,
    MembersComponent, 
    MemberCardComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoeditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['http://localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    LoginService,
    ErrorInterceptorProvider,
    AlertifyService,
    AtuhGuard,
    UserService,
    MemberDetailsResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
