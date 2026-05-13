import { STORAGE_STATE } from '../../playwright.config';
import { LoginPage } from '@_src/pages/login.page';
import { user } from '@_src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('user can login with valid data', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);

  //Act
  await loginPage.goto();
  await loginPage.login(user);

  //Assert
  await expect(loginPage.topMenu.userAccountLink).toHaveText(user.email);
  await page.context().storageState({ path: STORAGE_STATE });
});
