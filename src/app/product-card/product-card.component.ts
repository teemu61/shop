import { Item } from './../models/item';
import { ShoppingCart } from './../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';

import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../models/product';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  subscription: Subscription;
  quantity: number = 0;


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
    return this.quantity;
  }

  async ngOnInit() {

    let cart = await this.cartService.getShoppingCart();
    this.subscription = cart.subscribe(c => {

      c.items.forEach(item => {
        if (item.product.id == this.product.id) {
          this.quantity = item.quantity;
        }
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

