import {
  createRegisterData,
  generateBillingAddressData,
} from '@_src/factory/register.user';
import { expect, test } from '@_src/fixtures/merged.fixtures';
import { Product } from '@_src/models/product.model';
import { BillingAddress } from '@_src/models/user.model';
import { CartPage } from '@_src/pages/cart.page';
import { CheckoutPage } from '@_src/pages/checkout.page';
import { ProductPage } from '@_src/pages/product.page';

test.describe('Checkout', () => {
  let productPage: ProductPage;
  let product: Product;
  let cartPage: CartPage;
  let billingAddressData: BillingAddress;

  test.beforeEach(async ({ getProductAndNavigate }) => {
    ({ product, productPage } = await getProductAndNavigate('books'));
    billingAddressData = generateBillingAddressData();
  });

  test(
    'DWS-501 Guest user can complete checkout',
    { tag: ['@E2E'] },
    async ({}) => {
      // Arrange
      const productTitle = product.title;
      const productPrice = product.price.toFixed(2);
      const expectedMessage = 'Your order has been successfully processed!';

      //Act
      await productPage.clickAddToCartButton();
      cartPage = await productPage.topMenu.selectCart();

      const checkoutSignInPage = await cartPage.userCheckout();

      const checkoutPage = await checkoutSignInPage.clickCheckoutAsGuest();

      await checkoutPage.fillBillingAddressAndContinue(billingAddressData);
      const checkoutCompletePage = await checkoutPage.orderCheckout();

      //Assert
      await expect(checkoutPage.productName).toHaveText(productTitle);
      await expect(checkoutPage.subTotalPrice).toContainText(productPrice);
      await expect(checkoutCompletePage.successCheckoutMessage).toHaveText(
        expectedMessage,
      );
    },
  );

  test(
    'DWS-502 Newly registered user can complete checkout',
    { tag: ['@E2E'] },
    async ({}) => {
      // Arrange
      const registerData = createRegisterData();
      const productTitle = product.title;
      const productPrice = product.price.toFixed(2);
      const expectedMessage = 'Your order has been successfully processed!';

      //Act
      await productPage.clickAddToCartButton();
      cartPage = await productPage.topMenu.selectCart();

      const checkoutSignInPage = await cartPage.userCheckout();

      const registerPage = await checkoutSignInPage.clickRegister();
      const registerResultPage = await registerPage.register(registerData);
      const checkoutPage =
        await registerResultPage.clickContinueButton(CheckoutPage);

      await cartPage.userCheckout();

      await checkoutPage.fillBillingAddressAndContinue(billingAddressData);
      const checkoutCompletePage = await checkoutPage.orderCheckout();

      //Assert
      await expect(checkoutPage.productName).toHaveText(productTitle);
      await expect(checkoutPage.subTotalPrice).toContainText(productPrice);
      await expect(checkoutCompletePage.successCheckoutMessage).toHaveText(
        expectedMessage,
      );
    },
  );
});
