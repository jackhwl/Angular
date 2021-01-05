import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProduct$ = this.productService.selectedProduct$;

  products$ = this.productService.productsWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
