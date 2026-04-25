import { Locator, Page } from '@playwright/test';

export type TopMenuLink = 'register' | 'login' | 'cart' | 'wishlist';

export class TopMenuComponent {
  registerLink: Locator;
  loginLink: Locator;
  userAccountLink: Locator;
  logoutLink: Locator;
  shoppingCartLink: Locator;
  shoppingCartQty: Locator;
  wishingListLink: Locator;

  constructor(private page: Page) {
    this.registerLink = this.page.locator('.ico-register');
    this.loginLink = this.page.locator('.ico-login');
    this.userAccountLink = this.page.locator('.header-links .account');
    this.logoutLink = this.page.locator('.ico-logout');
    this.shoppingCartLink = this.page.locator('.ico-cart .cart-label');
    this.shoppingCartQty = this.page.locator('.ico-cart .cart-qty');
    this.wishingListLink = this.page.locator('.ico-wishlist .cart-label');
  }

  async clickTopMenuLink(link: TopMenuLink): Promise<void> {
    switch (link) {
      case 'register':
        await this.registerLink.click();
        break;
      case 'login':
        await this.loginLink.click();
        break;
      case 'cart':
        await this.shoppingCartLink.click();
        break;
      case 'wishlist':
        await this.wishingListLink.click();
        break;
    }
  }
}
