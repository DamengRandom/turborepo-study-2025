import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductRequest, Product } from '@repo/types';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product with an auto-generated id', () => {
      const createProductDto: CreateProductRequest = {
        name: 'Test Product',
        price: 99.99
      };

      const product = service.createProduct(createProductDto);

      expect(product).toBeDefined();
      expect(product.id).toBe('1');
      expect(product.name).toBe(createProductDto.name);
      expect(product.price).toBe(createProductDto.price);
    });

    it('should increment product id for each new product', () => {
      const firstProduct = service.createProduct({ name: 'First', price: 10 });
      const secondProduct = service.createProduct({ name: 'Second', price: 20 });

      expect(firstProduct.id).toBe('1');
      expect(secondProduct.id).toBe('2');
    });
  });

  describe('getProducts', () => {
    it('should return empty array initially', () => {
      const products = service.getProducts();
      expect(products).toEqual([]);
    });

    it('should return all created products', () => {
      const product1 = service.createProduct({ name: 'First', price: 10 });
      const product2 = service.createProduct({ name: 'Second', price: 20 });

      const products = service.getProducts();

      expect(products).toHaveLength(2);
      expect(products).toEqual([product1, product2]);
    });
  });
});
