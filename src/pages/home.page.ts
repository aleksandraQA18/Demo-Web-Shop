import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '/';
  userAccount: Locator;

  constructor(page: Page) {
    super(page);
    this.userAccount = this.page.locator('.header-links .account');
  }
}
