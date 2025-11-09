import { Injectable } from '@nestjs/common';
import { CreateProductRequest, Product } from '@repo/types';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  createProduct(createProductRequest: CreateProductRequest) {
    const product: Product = {
        ...createProductRequest,
        id: (this.products.length + 1).toString(),
    };

    this.products.push(product);

    return product;
  }

  getProducts() {
    return this.products;
  }
}
