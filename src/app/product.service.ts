import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

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
}
