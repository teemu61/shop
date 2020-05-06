import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

   save(product) {
     console.log("ProductFormComponent save called...");
     console.log("product is: ",product)
   }

  ngOnInit(): void {
  }

}
