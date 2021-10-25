import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, BasicProduct } from '@ngrx-nx-workshop/api-interfaces';
import { data } from '@ngrx-nx-workshop/data';

function stripDescription(originalData: Product[]): BasicProduct[] {
  return originalData.map(({ description, ...product }) => product);
}

@Injectable()
export class ProductService {
  getProductList(): BasicProduct[] {
    return stripDescription(data);
  }

  getProduct(id: string): Product {
    const product = data.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
    return product;
  }
}
