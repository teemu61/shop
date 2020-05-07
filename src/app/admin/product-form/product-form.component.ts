import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {title: "", price: 0, category: "", imageUrl: ""};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
      this.categories$ = categoryService.getCategories();

      console.log("route.snaphot is: ", this.route.snapshot);
      let id = this.route.snapshot.paramMap.get('id');
      console.log("product id from snapshot is: "+id);
      if (id) this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p);

  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


}
