import { ShoppingCart } from './../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Item } from '../models/item';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  isAdmin: boolean;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private ShoppingCartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => {
      this.isAdmin = appUser.isAdmin;
    });
  }

  logout() { 
    this.auth.logout(); 
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.isAdmin = appUser.isAdmin);
    this.cart$ = await this.ShoppingCartService.getShoppingCart();
  }
}
