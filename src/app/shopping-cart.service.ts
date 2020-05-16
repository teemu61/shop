import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from './models/item';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import { from, Observable, combineLatest } from 'rxjs';
import { Product } from './models/product';
import { map, take, flatMap } from 'rxjs/operators';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';


interface DocWithId { id: string; }

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firestore: AngularFirestore) {
  }

  private create() {

    console.log("create cart called...");
    let id = this.firestore.createId();
    console.log("random id generated by firestore: " + id);
    let cart = { dateCreated: new Date().getTime() };
    let promise = this.firestore
      .collection('shopping-carts')
      .doc(id)
      .set(cart)
      .then(() => {
        let shoppingCart: ShoppingCart = { id: id, dateCreated: cart.dateCreated, items: [] };
        return shoppingCart;
      });
    return promise;
  }

  private async getOrCreateCartId() {
    console.log("getOrCreateCart called...");
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    console.log("cardId not found form localStorage...");
    let result = await this.create();
    localStorage.setItem("cartId", result.id);
    return result.id;
  }

  public getItem(cartId: string, productId: string) {
    return this.firestore
      .collection('shopping-carts')
      .doc(cartId)
      .collection('items')
      .doc(productId)
  }

  public async getKortti() {
    return this.getDocumentsWithSubcollection('shopping-carts', "items")
  }

  convertSnapshots<T>(snaps) {
    return <T[]>snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      };
    });
  }

  getDocumentsWithSubcollection<T extends DocWithId>(
    collection: string,
    subCollection: string
  ) {
    return this.firestore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map(this.convertSnapshots),
        map((documents: T[]) =>
          documents.map(document => {
            return this.firestore
              .collection(`${collection}/${document.id}/${subCollection}`)
              .snapshotChanges()
              .pipe(
                map(this.convertSnapshots),
                map(subdocuments =>
                  Object.assign(document, { [subCollection]: subdocuments })
                )
              );
          })
        ),
        flatMap(combined => combineLatest(combined))
      );

  }


  async addToCart(product: Product) {
    console.log("addToCart called...");
    let cartId = await this.getOrCreateCartId();
    console.log("cartId is: " + cartId + ", productId is: " + product.id);
    let document = this.getItem(cartId, product.id);

    document.snapshotChanges()
      .pipe(take(1))
      .subscribe(action => {
        if (action.payload.exists) {
          let i = action.payload.data() as Item;
          let quantity = i.quantity + 1
          document.update({ quantity: quantity });
          console.log("quantity: ", quantity);
        } else {
          document.set({ quantity: 1, product: product });
          console.log("new product added to shopping-cart");
        }
      });
  }

  async removeFromCart(product: Product) {
    console.log("removeFromCart called...");
    let cartId = await this.getOrCreateCartId();
    console.log("cartId is: " + cartId + ", productId is: " + product.id);
    let document = this.getItem(cartId, product.id);

    document.snapshotChanges()
      .pipe(take(1))
      .subscribe(action => {
        if (action.payload.exists) {
          let i = action.payload.data() as Item;
          let quantity = i.quantity - 1
          document.update({ quantity: quantity });
          console.log("quantity: ", quantity);
        } 
      });
  }

  private getCart(cartId: string) {
    console.log("getCart called...");
    let promise = this.firestore.collection('shopping-carts').doc(cartId).get().toPromise()
      .then((snapshot) => {
        return snapshot.data() as ShoppingCart;
      });
    return promise;
  }
}