import { HomePage } from '../src/pages/home.page';
import { LoginPage } from '../src/pages/login.page';
import { user } from '../src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('login test', () => {
  test('user can login with valid data', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    //Act
    await loginPage.goto();
    await loginPage.login(user);

    //Assert
    await expect(homePage.userAccount).toHaveText(user.email);
  });
});
