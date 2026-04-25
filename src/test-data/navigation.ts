import { MainMenuLink } from '../components/main.menu.components';
import { TopMenuLink } from '../components/top.menu.components';

export const topMenuLinks: { name: TopMenuLink; urlPart: string }[] = [
  { name: 'register', urlPart: 'register' },
  { name: 'login', urlPart: 'login' },
  { name: 'cart', urlPart: 'cart' },
  { name: 'wishlist', urlPart: 'wishlist' },
] as const;

export const mainMenuLinks: { name: MainMenuLink; urlPart: string }[] = [
  { name: 'books', urlPart: 'books' },
  { name: 'computers', urlPart: 'computers' },
  { name: 'electronics', urlPart: 'electronics' },
  { name: 'apparel-shoes', urlPart: 'apparel-shoes' },
  { name: 'digital-downloads', urlPart: 'digital-downloads' },
  { name: 'jewelry', urlPart: 'jewelry' },
  { name: 'gift-cards', urlPart: 'gift-cards' },
] as const;
