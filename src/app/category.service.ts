import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Category } from './models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getAll() {
      return this.firestore
      .collection('categories')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(n => {
          const category = n.payload.doc.data() as Category;
          category.id = n.payload.doc.id;
          return category;
        })
      }))
  }
}
