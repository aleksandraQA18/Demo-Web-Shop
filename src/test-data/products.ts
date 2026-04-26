import { Product } from '../models/product.model';

export const products: Product[] = [
  {
    id: 0,
    title: 'Computing and Internet',
    price: 10.0,
    inStock: true,
    categoryUrl: 'books',
    url: 'computing-and-internet',
  },
  {
    id: 1,
    title: 'Smartphone',
    price: 100.0,
    inStock: true,
    categoryUrl: 'cell-phones',
    url: 'smartphone',
  },
  {
    id: 2,
    title: 'Custom T-Shirt',
    price: 15.0,
    inStock: false,
    categoryUrl: 'apparel-shoes',
    url: 'custom-t-shirt',
  },
  {
    id: 3,
    title: 'Black & White Diamond Heart',
    price: 130.0,
    inStock: false,
    categoryUrl: 'jewelry',
    url: 'black-white-diamond-heart',
  },
];
