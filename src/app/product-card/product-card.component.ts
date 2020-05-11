import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    console.log("addToCart called...");
    let cartId = localStorage.getItem('cartId');
    console.log("cardId form localStorage is: ", cartId);

    if (!cartId) {
      console.log("cardId not found from localStore...");
      this.cartService.create().subscribe(cart => {
        localStorage.setItem("cartId", cart.id);
      });
    } else {
      // add product to cart
    }
  }
}
