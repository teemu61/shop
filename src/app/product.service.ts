import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from './models/product';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  create(product) {

    console.log("create product called...");
    //create random id
    const id = this.firestore.createId();

    this.firestore
      .collection('products')
      .doc(id)
      .set(product);
  }

  // getAll() {
  //   console.log("ProductService getAll called...");
  //   return this.firestore.collection('products').valueChanges();
  // }

  getAll() {

    this.firestore
      .collection('products')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(n => {
          const data = n.payload.doc.data() as Product;
          const id = n.payload.doc.id;
          return { id, ...data };
        })
      })).subscribe(n => {
        n.forEach(k => {
          console.log("id: " +k.id);
          console.log("title: "+k.title);
        })
      })


    return this.firestore
      .collection('products')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(n => {
          const data = n.payload.doc.data() as Product;
          const id = n.payload.doc.id;
          return { id, ...data };
        })
      }))
  }

  get(productId: string): Observable<Product> {

    console.log("get called with productId: " + productId);

    let promise = this.firestore.collection('products').doc(productId).get().toPromise()
      .then((snapshot) => {
        return snapshot.data() as Product;
      });
    return from(promise);
  }

}
