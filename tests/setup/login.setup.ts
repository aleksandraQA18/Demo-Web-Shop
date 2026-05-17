import { STORAGE_STATE } from '@_pw-config';
import { pagesObjectsTest as setup } from '@_src/fixtures/pages.fixtures';
import { user } from '@_src/test-data/user.data';
import { expect } from '@playwright/test';

setup('login and save session', async ({ page, loginPage }) => {
  //Act
  await loginPage.login(user);

  //Assert
  await expect(loginPage.topMenu.userAccountLink).toHaveText(user.email);
  await page.context().storageState({ path: STORAGE_STATE });
});
