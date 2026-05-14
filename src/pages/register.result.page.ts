import { TopMenuComponent } from '@_src/components/top.menu.components';
import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class RegisterResultPage extends BasePage {
  registerCompletedMessage: Locator;
  topMenu: TopMenuComponent;

  constructor(page: Page) {
    super(page);
    this.topMenu = new TopMenuComponent(this.page);
    this.registerCompletedMessage = this.page.locator(
      '.registration-result-page .result',
    );
  }
}
