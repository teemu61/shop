import { ShoppingCartService } from './../shopping-cart.service';
import { Item } from './item';

export class ShoppingCart {
    id: string;
    dateCreated: number;
    
    constructor(public items: Item[]) {}

    get productIds() {
      return Object.keys(this.items);
    }

    get totalPrice() {
      let sum = 0;
      for (let productId in this.items)
        sum += this.items[productId].product.price * this.items[productId].quantity;
      return sum;  
    }


    get totalItemsCount() {
      let count = 0;
      this.items.forEach(item => count += item.quantity)
      return count;
    }
}