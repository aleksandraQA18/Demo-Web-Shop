import { expect, test } from '@_src/fixtures/merged.fixtures';
import { user } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test(
    'DWS-605 User can login with valid credentials',
    { tag: '@smoke' },
    async ({ loginPage }) => {
      //Arrange
      const expectedLogoutLink = 'Log out';

      //Act
      const homePage = await loginPage.login(user);

      //Assert
      await expect(homePage.topMenu.userAccountLink).toHaveText(user.email);
      await expect(homePage.topMenu.logoutLink).toHaveText(expectedLogoutLink);
    },
  );

  test(
    'DWS-606 Error message for invalid login credentials',
    { tag: '@regression' },
    async ({ loginPage }) => {
      //Arrange
      const expectedMessage =
        'Login was unsuccessful. Please correct the errors and try again.';
      const invalidUser = { ...user, email: 'invalidemail@gmail.com' };

      //Act
      await loginPage.login(invalidUser);

      //Assert
      await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
    },
  );

  test(
    'DWS-607 DWS-606 Error message for invalid password',
    { tag: '@regression' },
    async ({ loginPage }) => {
      //Arrange
      const expectedMessage =
        'Login was unsuccessful. Please correct the errors and try again.';
      const invalidUser = { ...user, password: 'Password123' };

      //Act
      await loginPage.login(invalidUser);

      //Assert
      await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
    },
  );
});
