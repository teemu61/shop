import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firestore: AngularFirestore) {
  }

  create() {

    console.log("create called...");
    let id = this.firestore.createId();
    let cart = { dateCreated: new Date().getTime() };

    let promise = this.firestore
      .collection('shopping-carts')
      .doc(id)
      .set(cart).then(() => {
        let shoppingCart: ShoppingCart = { id: id, dateCreated: cart.dateCreated };
        return shoppingCart;
      });

    return from(promise);
  }



}
