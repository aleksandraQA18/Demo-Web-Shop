import { createRegisterData } from '@_src/factory/register.user';
import { pagesObjectsTest } from '@_src/fixtures/pages.fixtures';
import { RegisterUser } from '@_src/models/user.model';
import { expect } from '@playwright/test';

pagesObjectsTest.describe('Verify register', () => {
  let registerUserData: RegisterUser;

  pagesObjectsTest.beforeEach(async () => {
    registerUserData = createRegisterData();
  });

  pagesObjectsTest('register new user DWS-06-01', async ({ registerPage }) => {
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

  pagesObjectsTest(
    'register new user with invalid email DWS-06-02',
    async ({ registerPage }) => {
      //Arrange
      registerUserData.email = 'invalidemail';
      const expectedMessage = 'Wrong email';

      //Act
      await registerPage.register(registerUserData);

      //Assert
      await expect(registerPage.invalidEmailEror).toHaveText(expectedMessage);
    },
  );

  pagesObjectsTest(
    'register new user with invalid password DWS-06-03',
    async ({ registerPage }) => {
      //Arrange
      registerUserData.password = 'test';
      const expectedMessage = 'The password should have at least 6 characters.';

      //Act
      await registerPage.register(registerUserData);

      //Assert
      await expect(registerPage.invalidPasswordError).toHaveText(
        expectedMessage,
      );
    },
  );
});
