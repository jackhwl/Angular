import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, EMPTY } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Product } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  errorMessage = '';

  product$ = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  pageTitle$ = this.product$.pipe(
    map((p: Product) => (p ? `Product Detail for: ${p.productName}` : null))
  );

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ]).pipe(
    filter(Boolean),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle
    }))
  );

  constructor(private productService: ProductService) {}
}
