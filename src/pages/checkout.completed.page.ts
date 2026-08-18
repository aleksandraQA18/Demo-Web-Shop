import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage extends BasePage {
  url = '/checkout/completed/';
  successCheckoutMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.successCheckoutMessage = this.page.getByText(
      'Your order has been successfully processed!',
    );
  }
}
