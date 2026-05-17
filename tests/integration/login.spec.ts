import { expect, test } from '@_src/fixtures/merged.fixtures';
import { user } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test('user can login with valid data DWS-06-04', async ({ loginPage }) => {
    //Arrange
    const expectedLogoutLink = 'Log out';

    //Act
    const homePage = await loginPage.login(user);

    //Assert
    await expect(homePage.topMenu.userAccountLink).toHaveText(user.email);
    await expect(homePage.topMenu.logoutLink).toHaveText(expectedLogoutLink);
  });

  test('user cannot login with invalid email DWS-06-05', async ({
    loginPage,
  }) => {
    //Arrange
    const expectedMessage =
      'Login was unsuccessful. Please correct the errors and try again.';
    const invalidUser = { ...user, email: 'invalidemail@gmail.com' };

    //Act
    await loginPage.login(invalidUser);

    //Assert
    await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
  });

  test('user cannot login with invalid password DWS-06-06', async ({
    loginPage,
  }) => {
    //Arrange
    const expectedMessage =
      'Login was unsuccessful. Please correct the errors and try again.';
    const invalidUser = { ...user, password: 'Password123' };

    //Act
    await loginPage.login(invalidUser);

    //Assert
    await expect(loginPage.failLoginMessage).toHaveText(expectedMessage);
  });
});
