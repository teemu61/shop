import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

export interface Category {name: string };

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getAll() {
      console.log("getCategories called....")
      return this.firestore
      .collection('categories')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(n => {
          const data = n.payload.doc.data() as Category;
          const id = n.payload.doc.id;
          return {id, ...data};
        })
      }))
  }
}
