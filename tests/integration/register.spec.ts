import { createRegisterData } from '@_src/factory/register.user';
import { expect, test } from '@_src/fixtures/merged.fixtures';
import { RegisterUser } from '@_src/models/user.model';

test.describe('Verify register', () => {
  let registerUserData: RegisterUser;

  test.beforeEach(async () => {
    registerUserData = createRegisterData();
  });

  test(
    'DWS-601 Successful user registration',
    { tag: '@smoke' },
    async ({ registerPage }) => {
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
    },
  );

  test(
    'DWS-602 Error message for invalid email during registration',
    { tag: '@regression' },
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

  test(
    'DWS-603 Error message for weak password',
    { tag: '@regression' },
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
