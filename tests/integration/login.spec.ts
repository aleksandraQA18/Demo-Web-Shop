import { HomePage } from '../../src/pages/home.page';
import { LoginPage } from '../../src/pages/login.page';
import { user } from '../../src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('user can login with valid data DWS-06-04', async ({ page }) => {
    //Arrange
    const homePage = new HomePage(page);

    //Act
    await loginPage.login(user);

    //Assert
    await expect(homePage.topMenu.userAccount).toHaveText(user.email);
  });

  test('user cannot login with invalid email DWS-06-05', async () => {
    //Arrange
    const expectedMessage =
      'Login was unsuccessful. Please correct the errors and try again.';
    user.email = 'invalidemail@gmail.com';

    //Act
    await loginPage.login(user);

    //Assert
    await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
  });

  test('user cannot login with invalid password DWS-06-06', async () => {
    //Arrange
    const expectedMessage =
      'Login was unsuccessful. Please correct the errors and try again.';
    user.password = 'Password123';

    //Act
    await loginPage.login(user);

    //Assert
    await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
  });
});
