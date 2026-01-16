import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class RegisterResultPage extends BasePage {
  registerCompletedMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.registerCompletedMessage = this.page.locator(
      '.registration-result-page .result',
    );
  }
}
