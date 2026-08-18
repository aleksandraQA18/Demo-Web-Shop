import { STORAGE_STATE } from '@_pw-config';
import { expect, test as setup } from '@_src/fixtures/merged.fixtures';
import { user } from '@_src/test-data/user.data';

setup('login and save session', async ({ page, loginPage }) => {
  //Act
  await page.context().clearCookies();
  await loginPage.login(user);

  //Assert
  await expect(loginPage.topMenu.userAccountLink).toHaveText(user.email);
  await page.context().storageState({ path: STORAGE_STATE });
});
