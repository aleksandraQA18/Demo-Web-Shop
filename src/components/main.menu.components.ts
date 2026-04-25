import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  booksButton: Locator;
  computersButton: Locator;

  constructor(private page: Page) {
    this.booksButton = this.page.locator('.top-menu a[href="/books"]');
    this.computersButton = this.page.locator('.top-menu a[href="/computers"]');
  }
}
