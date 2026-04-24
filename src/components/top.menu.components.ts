import { Locator, Page } from '@playwright/test';

export class TopMenuComponent {
  userAccount: Locator;
  logout: Locator;
  shoppingCart: Locator;
  shoppingCartQty: Locator;
  wishingList: Locator;
  wishingListQty: Locator;

  constructor(private page: Page) {
    this.userAccount = this.page.locator('.header-links .account');
    this.logout = this.page.locator('.ico-logout');
    this.shoppingCart = this.page.locator('.ico-cart .cart-label');
    this.shoppingCartQty = this.page.locator('.ico-cart .cart-qty');
    this.wishingList = this.page.locator('.ico-wishlist .cart-label');
    this.wishingListQty = this.page.locator('.ico-wishlist .cart-qty');
  }
}
