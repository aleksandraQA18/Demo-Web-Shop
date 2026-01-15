import { User } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';
  email: Locator;
  password: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.email = this.page.locator('#Email');
    this.password = this.page.locator('#Password');
    this.loginButton = this.page.locator('.login-button');
  }

  async login(user: User): Promise<void> {
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.loginButton.click();
  }
}
