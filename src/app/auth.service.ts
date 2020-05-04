import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  appUser: AppUser;
  

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute) { this.user$ = afAuth.authState; }

  login() {
    console.log("login called...");
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }

  logout() {
    console.log("logout called...");
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    console.log("get appUser$ called...");
    return this.user$
      .pipe(switchMap(user => {
          return this.userService.get(user.uid);
      })
      )
  }

}
