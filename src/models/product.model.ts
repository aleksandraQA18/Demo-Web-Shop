import { MainMenuLink } from '../components/main.menu.components';

export interface Product {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
  categoryUrl: MainMenuLink;
  url: string;
}
