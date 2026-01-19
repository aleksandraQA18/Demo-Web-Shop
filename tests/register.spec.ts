import { createRegisterData } from '../src/factory/register.user';
import { RegisterUser } from '../src/models/user.model';
import { RegisterPage } from '../src/pages/register.page';
import { RegisterResultPage } from '../src/pages/register.result.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  let registerUserData: RegisterUser;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerUserData = createRegisterData();
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('register new user DWS-06-01', async ({ page }) => {
    //Arrange
    const expectedMessage = 'Your registration completed';
    const registerResultPage = new RegisterResultPage(page);

    //Act
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerResultPage.registerCompletedMessage).toHaveText(
      expectedMessage,
    );
    await expect(registerResultPage.topMenu.userAccount).toHaveText(
      registerUserData.email,
    );
  });

  test('register new user with invalid email DWS-06-02', async () => {
    //Arrange
    registerUserData.email = 'invalidemail';
    const expectedMessage = 'Wrong email';

    //Act
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.invalidEmailEror).toHaveText(expectedMessage);
  });

  test('register new user with invalid password DWS-06-03', async () => {
    //Arrange
    registerUserData.password = 'test';
    const expectedMessage = 'The password should have at least 6 characters.';

    //Act
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.invalidPasswordError).toHaveText(expectedMessage);
  });
});
