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

  delete(productId) {

    console.log("delete product called...");
    this.firestore
    .collection('products')
    .doc(productId)
    .delete();
  }

  update(productId, product) {

    console.log("update product called...");
    this.firestore

  }

  create(product) {

    console.log("create product called...");
    //create random id
    const id = this.firestore.createId();
    this.firestore
      .collection('products')
      .doc(id)
      .set(product);
  }

  getAll() {

    return this.firestore
      .collection('products')
      .snapshotChanges().pipe(map(actions => {
        return actions.map(n => {
          const product  = n.payload.doc.data() as Product;
          product.id = n.payload.doc.id;
          return product;
        })
      }))
  }

  get(productId: string): Observable<Product> {

    console.log("product get called....");
    let promise = this.firestore.collection('products').doc(productId).get().toPromise()
      .then((snapshot) => {
        return snapshot.data() as Product;
      });
    return from(promise);
  }

}
