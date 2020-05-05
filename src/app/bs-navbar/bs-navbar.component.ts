import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})



export class BsNavbarComponent {

  appUser: AppUser;
  isAdmin: boolean;
  
  constructor(public auth: AuthService) {

    auth.appUser$.subscribe(appUser => {
      this.isAdmin = appUser.isAdmin;
    });
  }

  logout() {
    this.auth.logout();
  }


}
