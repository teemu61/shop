import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getCategories() {
    return this.firestore
      .collection('categories')
      .valueChanges()
      .pipe(map(n => n.sort()));
  }



}
