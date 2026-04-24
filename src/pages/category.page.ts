import { BasePage } from './base.page';
import { CartPage } from './cart.page';
import { HomePage } from './home.page';
import { ItemPage } from './item.page';
import { Locator, Page } from '@playwright/test';

export class CategoryPage extends BasePage {
  itemDetails: Locator;
  notificationBar: Locator;
  shoppingCart: Locator;
  cartItemQty: Locator;
  shoppingCartName: Locator;
  shoppingUnitPrice: Locator;
  shoppingQty: Locator;
  shoppingCartNotification: Locator;
  addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemDetails = this.page.locator('.details');
    this.notificationBar = this.page.locator('#bar-notification .content');
    this.shoppingCart = this.page.locator('.mini-shopping-cart');
    this.cartItemQty = this.page.locator('.cart-qty');
    this.shoppingCartName = this.shoppingCart.locator('.name a');
    this.shoppingUnitPrice = this.shoppingCart.locator('.price span');
    this.shoppingQty = this.shoppingCart.locator('.quantity span');
    this.shoppingCartNotification = this.notificationBar.locator('a');
    this.addToCartButton = this.page.locator('.product-box-add-to-cart-button');
  }

  async getItemByTitle(title: string): Promise<Locator> {
    return this.itemDetails.filter({ hasText: title });
  }

  async clickAddToCart(item: Locator): Promise<void> {
    await item.locator('.product-box-add-to-cart-button').click();
  }

  async goToItemPage(item: Locator): Promise<ItemPage> {
    await item.locator('a').click();
    return new ItemPage(this.page);
  }

  async goToShoppingCart(): Promise<CartPage> {
    await this.topMenu.shoppingCart.click();
    return new CartPage(this.page);
  }

  async goToBooksCategory(): Promise<CategoryPage> {
    await this.mainMenu.booksButton.click();
    return new CategoryPage(this.page);
  }

  async goToComputersCategory(): Promise<CategoryPage> {
    await this.mainMenu.computersButton.click();
    return new CategoryPage(this.page);
  }

  async clickHomePageLogo(): Promise<HomePage> {
    await this.mainMenu.homePageLogo.click();
    return this;
  }
}
