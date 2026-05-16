import { TopMenuComponent } from '@_src/components/top.menu.components';
import { LoginUser } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { HomePage } from '@_src/pages/home.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';
  topMenu: TopMenuComponent;
  email: Locator;
  password: Locator;
  loginButton: Locator;
  failLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.topMenu = new TopMenuComponent(this.page);
    this.email = this.page.locator('#Email');
    this.password = this.page.locator('#Password');
    this.loginButton = this.page.locator('.login-button');
    this.failLoginMessage = this.page.locator(
      '.validation-summary-errors span',
    );
  }

  async login(user: LoginUser): Promise<HomePage> {
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.loginButton.click();
    return new HomePage(this.page);
  }
}
