import { HomePage } from '../src/pages/home.page';
import { LoginPage } from '../src/pages/login.page';
import { user } from '../src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('user can login with valid data', async () => {
    //Act
    await loginPage.goto();
    await loginPage.login(user);

    //Assert
    await expect(homePage.userAccount).toHaveText(user.email);
  });

  test('user cannot login with invalid email', async () => {
    //Arrange
    const expectedMessage =
      'Login was unsuccessful. Please correct the errors and try again.';
    user.email = 'invalidemail@gmail.com';

    //Act
    await loginPage.goto();
    await loginPage.login(user);

    //Assert
    await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
  });

  test('user cannot login with invalid password', async () => {
    //Arrange
    const expectedMessage =
      'Login was unsuccessful. Please correct the errors and try again.';
    user.password = 'Password123';

    //Act
    await loginPage.goto();
    await loginPage.login(user);

    //Assert
    await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
  });
});
