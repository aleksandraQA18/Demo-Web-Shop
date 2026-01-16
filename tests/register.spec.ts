import { createRegisterData } from '../src/factory/register.user';
import { RegisterPage } from '../src/pages/register.page';
import { RegisterResultPage } from '../src/pages/register.result.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerResultPage: RegisterResultPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerResultPage = new RegisterResultPage(page);
  });

  test('register new user', async () => {
    //Arrange
    const registrationUserData = createRegisterData();
    const expectedMessage = 'Your registration completed';

    //Act
    await registerPage.goto();
    await registerPage.register(registrationUserData);

    //Assert
    await expect(registerResultPage.registerCompletedMessage).toHaveText(
      expectedMessage,
    );
    await expect(registerResultPage.topMenu.userAccount).toHaveText(
      registrationUserData.email,
    );
  });

  test('register new user with invalid email', async () => {
    //Arrange
    const registrationUserData = createRegisterData();
    registrationUserData.email = 'invalidemail';
    const expectedMessage = 'Wrong email';

    //Act
    await registerPage.goto();
    await registerPage.register(registrationUserData);

    //Assert
    await expect(registerPage.invalidEmailEror).toHaveText(expectedMessage);
  });

  test('register new user with invalid password', async () => {
    //Arrange
    const registrationUserData = createRegisterData();
    registrationUserData.password = 'test';
    const expectedMessage = 'The password should have at least 6 characters.';

    //Act
    await registerPage.goto();
    await registerPage.register(registrationUserData);

    //Assert
    await expect(registerPage.invalidPasswordError).toHaveText(expectedMessage);
  });
});
