import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductRequest, Product } from '@repo/types';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            createProduct: jest.fn(),
            getProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', () => {
      const createProductDto: CreateProductRequest = {
        name: 'Test Product',
        price: 99.99,
      };
      const expectedProduct: Product = {
        ...createProductDto,
        id: '1',
      };

      jest.spyOn(productsService, 'createProduct').mockReturnValue(expectedProduct);

      const result = controller.createProduct(createProductDto);

      expect(productsService.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(expectedProduct);
    });
  });

  describe('getProducts', () => {
    it('should return an array of products', () => {
      const expectedProducts: Product[] = [
        { id: '1', name: 'Product 1', price: 10 },
        { id: '2', name: 'Product 2', price: 20 },
      ];

      jest.spyOn(productsService, 'getProducts').mockReturnValue(expectedProducts);

      const result = controller.getProducts();

      expect(productsService.getProducts).toHaveBeenCalled();
      expect(result).toEqual(expectedProducts);
    });
  });
});
