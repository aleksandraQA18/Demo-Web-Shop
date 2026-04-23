// db.ts
import productsData from '../fake-api/products.json';

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  inStock: boolean;
  url: string;
};

export type DB = {
  products: Product[];
};

export function createDB(): DB {
  return {
    products: [...productsData],
  };
}
