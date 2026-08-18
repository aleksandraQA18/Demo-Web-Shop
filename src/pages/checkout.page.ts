import { BillingAddress } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { CheckoutCompletePage } from '@_src/pages/checkout.completed.page';
import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage extends BasePage {
  billingAddressSelect: Locator;
  billingFirstName: Locator;
  billingLastName: Locator;
  billingEmail: Locator;
  billingCountry: Locator;
  billingCity: Locator;
  billingAddress1: Locator;
  billingZip: Locator;
  billingPhone: Locator;
  billingContinueButton: Locator;
  shippingContinueButton: Locator;
  shippingMethodContinueButton: Locator;
  paymentMethodContinueButton: Locator;
  paymentInfoContinueButton: Locator;
  confirmOrderButton: Locator;
  productName: Locator;
  subTotalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.billingAddressSelect = this.page.locator('#billing-address-select');
    this.billingFirstName = this.page.locator('#BillingNewAddress_FirstName');
    this.billingLastName = this.page.locator('#BillingNewAddress_LastName');
    this.billingEmail = this.page.locator('#BillingNewAddress_Email');
    this.billingCountry = this.page.locator('#BillingNewAddress_CountryId');
    this.billingCity = this.page.locator('#BillingNewAddress_City');
    this.billingAddress1 = this.page.locator('#BillingNewAddress_Address1');
    this.billingZip = this.page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = this.page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueButton = this.page.locator(
      '#billing-buttons-container .new-address-next-step-button',
    );

    this.shippingContinueButton = this.page.locator(
      '#shipping-buttons-container .new-address-next-step-button',
    );
    this.shippingMethodContinueButton = this.page.locator(
      '#shipping-method-buttons-container .shipping-method-next-step-button',
    );

    this.paymentMethodContinueButton = this.page.locator(
      '#payment-method-buttons-container .payment-method-next-step-button',
    );

    this.paymentInfoContinueButton = this.page.locator(
      '#payment-info-buttons-container .payment-info-next-step-button',
    );

    this.confirmOrderButton = this.page.locator(
      '#confirm-order-buttons-container .confirm-order-next-step-button',
    );
    this.productName = this.page.locator('.product-name');
    this.subTotalPrice = this.page.locator('.product-price').first();
  }

  async fillBillingAddressAndContinue(billing: BillingAddress): Promise<void> {
    await this.billingFirstName.fill(billing.firstName);
    await this.billingLastName.fill(billing.lastName);
    await this.billingEmail.fill(billing.email);
    await this.billingCountry.selectOption('1');
    await this.billingCity.fill(billing.city);
    await this.billingAddress1.fill(billing.address1);
    await this.billingZip.fill(billing.zip);
    await this.billingPhone.fill(billing.phone);

    await this.billingContinueButton.click();
    // wait for shipping step to appear before continuing the flow
    await expect(this.shippingContinueButton).toBeVisible();
  }

  async orderCheckout(): Promise<CheckoutCompletePage> {
    await this.shippingContinueButton.click();
    await expect(this.shippingMethodContinueButton).toBeVisible();

    await this.shippingMethodContinueButton.click();
    await expect(this.paymentMethodContinueButton).toBeVisible();

    await this.paymentMethodContinueButton.click();
    await expect(this.paymentInfoContinueButton).toBeVisible();

    await this.paymentInfoContinueButton.click();
    await expect(this.confirmOrderButton).toBeVisible();

    await this.confirmOrderButton.click();
    return new CheckoutCompletePage(this.page);
  }
}
