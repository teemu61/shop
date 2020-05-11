import { switchMap } from 'rxjs/operators';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;


  constructor(
    route: ActivatedRoute,
    productService: ProductService,

    categoryService: CategoryService) {

    productService.getAll().pipe(
      /* muunna Observable<Product> --> Observable<QueryParamMap> */
      switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });


    this.categories$ = categoryService.getAll();

  }
}
