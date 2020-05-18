
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {

    const productId = this.product.id;
    let quantity: number = 0;

    if (this.shoppingCart != undefined) {

      //console.log("getQuantity called. this.shoppingCart is: ", this.shoppingCart);

      this.shoppingCart[0].items.forEach(e => {
        if (e.id === this.product.id) {
          quantity = e.quantity;
        }
      });
    }

    return quantity;
  }
}
