import { BasePage } from './base.page';
import { RegisterUser } from '@_src/models/user.model';
import { Locator, Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register';
  maleGenderRadio: Locator;
  femaleGenderRadio: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  confirmPasswordInput: Locator;
  registerButton: Locator;
  invalidEmailEror: Locator;
  invalidPasswordError: Locator;

  constructor(page: Page) {
    super(page);
    this.maleGenderRadio = this.page.locator('#gender-male');
    this.femaleGenderRadio = this.page.locator('#gender-female');
    this.firstNameInput = this.page.locator('#FirstName');
    this.lastNameInput = this.page.locator('#LastName');
    this.emailInput = this.page.locator('#Email');
    this.passwordInput = this.page.locator('#Password');
    this.confirmPasswordInput = this.page.locator('#ConfirmPassword');
    this.registerButton = this.page.locator('#register-button');
    this.invalidEmailEror = this.page.locator(
      '#Email ~ span:nth-of-type(2) span',
    );
    this.invalidPasswordError = this.page.locator(
      '#Password ~ span:nth-of-type(2) span',
    );
  }

  async register(registerUser: RegisterUser): Promise<void> {
    const radioButton =
      registerUser.gender === 'male'
        ? this.maleGenderRadio
        : this.femaleGenderRadio;
    await radioButton.click();
    await this.firstNameInput.fill(registerUser.firstName);
    await this.lastNameInput.fill(registerUser.lastName);
    await this.emailInput.fill(registerUser.email);
    await this.passwordInput.fill(registerUser.password);
    await this.confirmPasswordInput.fill(registerUser.password);
    await this.registerButton.click();
  }
}
