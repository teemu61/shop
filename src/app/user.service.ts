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

    let entry = {
      name: user.displayName,
      email: user.email
    };

    let url = '/users/' + user.uid;

    /* in case of existing admin user the db is updated, otherwise new entry is created */
    this.firestore.collection(`users`, ref => ref.where('isAdmin', "==", true)).snapshotChanges().subscribe(res => {
      if (res.length > 0) {
        console.log("update existing entry in db...");
        this.firestore
          .collection('users')
          .doc(user.uid)
          .update(entry);
      }
      else {
        console.log("create a new entry in db...");
        this.firestore
          .collection('users')
          .doc(user.uid)
          .set(entry);
      }
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

}
