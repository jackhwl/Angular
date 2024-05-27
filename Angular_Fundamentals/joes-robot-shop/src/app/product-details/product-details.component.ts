import { Component, Input } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  cart: IProduct[] = [];

  getImageUrl(product: IProduct): string {
    return '/assets/images/robot-parts/' + product.imageName;
  }

  addToCart(product: IProduct): void {
    this.cart.push(product);
    console.log(`product ${product.name} added to cart`);
  }

  getDiscountedClasses(product: IProduct): string[] {
    if (product.discount > 0) return ['strikethrough'];
    else return [''];
  }

}
