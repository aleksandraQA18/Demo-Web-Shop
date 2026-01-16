import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  homePageLogo: Locator;
  booksButton: Locator;
  computersButton: Locator;

  constructor(private page: Page) {
    this.booksButton = this.page.locator(
      '//ul[@class="top-menu"]//a[@href="/books"]',
    );
    this.computersButton = this.page.locator(
      '//ul[@class="top-menu"]//a[@href="/computers"]',
    );
    this.homePageLogo = this.page.locator('.header-logo');
  }
}
