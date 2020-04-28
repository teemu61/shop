import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireObject } from '@angular/fire/database/database';
import { map, switchMap } from 'rxjs/operators';

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

    /* new db document created each time */
    this.firestore
      .collection('users')
      .doc(user.uid)
      .set(entry);
  }

  get(uid: string) : AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }

}
