import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
//import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  save(user: firebase.User) {
    console.log("save called...");
    console.log("user.uid is: " + user.uid);

    let entry = { name: user.displayName, email: user.email };
    let url = '/users/' + user.uid;
    console.log("url is: " + url);
    console.log("entry is: ", entry);

    /* new db document create each time */
    this.firestore
      .collection('users')
      .doc(user.uid)
      .set(entry);

  }

}
