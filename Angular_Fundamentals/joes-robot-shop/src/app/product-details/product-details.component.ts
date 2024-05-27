import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  getImageUrl(product: IProduct): string {
    return '/assets/images/robot-parts/' + product.imageName;
  }

  buyButtonClicked(product: IProduct): void {
    this.buy.emit();
  }

  getDiscountedClasses(product: IProduct): string[] {
    if (product.discount > 0) return ['strikethrough'];
    else return [''];
  }

}
