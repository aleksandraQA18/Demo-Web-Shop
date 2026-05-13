import { BasePage } from './base.page';
import { LoginUser } from '@_src/models/user.model';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';
  email: Locator;
  password: Locator;
  loginButton: Locator;
  failLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.email = this.page.locator('#Email');
    this.password = this.page.locator('#Password');
    this.loginButton = this.page.locator('.login-button');
    this.failLoginMessage = this.page.locator(
      '.validation-summary-errors span',
    );
  }

  async login(user: LoginUser): Promise<void> {
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.loginButton.click();
  }
}
