import { BasePage } from '@_src/pages/base.page';
import { CheckoutPage } from '@_src/pages/checkout.page';
import { RegisterPage } from '@_src/pages/register.page';
import { Locator, Page } from '@playwright/test';

export class CheckoutSignInPage extends BasePage {
  guestCheckoutButton: Locator;
  registerCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.guestCheckoutButton = this.page.locator('.checkout-as-guest-button');
    this.registerCheckoutButton = this.page.locator('.register-button');
  }

  async clickCheckoutAsGuest(): Promise<CheckoutPage> {
    await this.guestCheckoutButton.click();
    return new CheckoutPage(this.page);
  }

  async clickRegister(): Promise<RegisterPage> {
    await this.registerCheckoutButton.click();
    return new RegisterPage(this.page);
  }
}
