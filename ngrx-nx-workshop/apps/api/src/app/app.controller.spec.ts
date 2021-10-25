import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { ProductService } from './product/product.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProductService]
    }).compile();
  });

  // describe('getData', () => {
  //   it('should return "Welcome to api!"', () => {
  //     const appController = app.get<AppController>(AppController);
  //     expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
  //   });
  // });
});
