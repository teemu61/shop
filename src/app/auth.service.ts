import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;
  }

  login() {
    console.log("login called...")
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }

  logout() {
    console.log("logout called...")
    this.afAuth.auth.signOut();
  }

}
