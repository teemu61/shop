
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  // canActivate(): Observable<boolean> {
  //   console.log("AdminAuthGuardService canActivate called...");
  //   let ret = this.auth.appUser$
  //   .pipe(map(appUser => appUser.isAdmin));
  //   console.log("ret is: ",ret);
  //   return ret;
  // }

  canActivate(): Observable<boolean> {
    console.log("AdminAuthGuardService canActivate called...");
    return this.auth.appUser$
    .pipe(map((appUser:any) => appUser.isAdmin));
  }

}

 
