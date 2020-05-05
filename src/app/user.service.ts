import { Observable, from } from 'rxjs';
import { AppUser } from './models/app-user';
import { Injectable, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireObject } from '@angular/fire/database/database';
import { map, switchMap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }


  save(user: firebase.User) {
    console.log("save called...");

    let entry = { name: user.displayName, email: user.email };
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

  get(uid: string): Observable<AppUser> {

    let appUser: AppUser = { name: "", email: "", isAdmin: undefined };

    let promise = this.firestore.collection('users').doc(uid).get().toPromise()
      .then((snapshot) => {
        let data = snapshot.data();
        appUser.email = data.email;
        appUser.name = data.name;
        appUser.isAdmin = data.isAdmin;
        console.log("appUser from db: ", appUser);
        return appUser;
      });

      return from(promise);
  }

}
