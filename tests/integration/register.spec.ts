import { createRegisterData } from '@_src/factory/register.user';
import { RegisterUser } from '@_src/models/user.model';
import { RegisterPage } from '@_src/pages/register.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  let registerUserData: RegisterUser;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerUserData = createRegisterData();
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('register new user DWS-06-01', async () => {
    //Arrange
    const expectedMessage = 'Your registration completed';

    //Act
    const registerResultPage = await registerPage.register(registerUserData);

    //Assert
    await expect(registerResultPage.registerCompletedMessage).toHaveText(
      expectedMessage,
    );
    await expect(registerResultPage.topMenu.userAccountLink).toHaveText(
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
