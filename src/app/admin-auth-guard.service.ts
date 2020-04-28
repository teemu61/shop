
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
    //map firebase.User -> AppUser
    .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
    //map AppUser -> isAdmin
    .pipe(map(appUser => appUser.isAdmin));
  }
}

 
