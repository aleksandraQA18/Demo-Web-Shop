import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '/';
  homePageLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.homePageLogo = this.page.locator('.header-logo');
  }
}
