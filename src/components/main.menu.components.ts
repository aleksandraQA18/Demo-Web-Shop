import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  homePageLogo: Locator;
  booksButton: Locator;
  computersButton: Locator;

  constructor(private page: Page) {
    this.homePageLogo = this.page.locator('.header-logo');
    this.booksButton = this.page.locator('.top-menu a[href="/books"]');
    this.computersButton = this.page.locator('.top-menu a[href="/computers"]');
  }
}
