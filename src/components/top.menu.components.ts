import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { WishListPage } from '@_src/pages/wishlist.page';
import { Locator, Page } from '@playwright/test';

export class TopMenuComponent {
  homePageLogo: Locator;
  registerLink: Locator;
  loginLink: Locator;
  logoutLink: Locator;
  userAccountLink: Locator;
  shoppingCartLink: Locator;
  shoppingCartQty: Locator;
  wishingListLink: Locator;
  miniShoppingCart: Locator;
  miniCartProductName: Locator;
  miniCartProductPrice: Locator;
  miniCartProductQty: Locator;

  constructor(private page: Page) {
    this.homePageLogo = this.page.locator('.header-logo');
    this.registerLink = this.page.locator('.ico-register');
    this.loginLink = this.page.locator('.ico-login');
    this.userAccountLink = this.page.locator('.header-links .account');
    this.logoutLink = this.page.locator('.ico-logout');
    this.shoppingCartLink = this.page.locator('.ico-cart .cart-label');
    this.shoppingCartQty = this.page.locator('.ico-cart .cart-qty');
    this.wishingListLink = this.page.locator('.ico-wishlist .cart-label');
    this.miniShoppingCart = this.page.locator('.mini-shopping-cart');
    this.miniCartProductName = this.miniShoppingCart.locator('.name');
    this.miniCartProductPrice = this.miniShoppingCart.locator('.price');
    this.miniCartProductQty = this.miniShoppingCart.locator('.quantity');
  }

  async selectRegister(): Promise<RegisterPage> {
    await this.registerLink.click();
    return new RegisterPage(this.page);
  }

  async selectLogin(): Promise<LoginPage> {
    await this.loginLink.click();
    return new LoginPage(this.page);
  }

  async selectCart(): Promise<CartPage> {
    await this.shoppingCartLink.click();
    return new CartPage(this.page);
  }

  async selectWishlist(): Promise<WishListPage> {
    await this.wishingListLink.click();
    return new WishListPage(this.page);
  }
}
