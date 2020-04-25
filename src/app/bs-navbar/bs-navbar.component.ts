import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: firebase.User;
  
  constructor(private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe( 

      user => { this.user = user;
      console.log("this.user is: ",user);
      
      });
   

  }

  logout() {
    console.log("logout called...")
    this.afAuth.auth.signOut();
  }

}
