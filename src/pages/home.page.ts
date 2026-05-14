import { MainMenuComponent } from '@_src/components/main.menu.components';
import { TopMenuComponent } from '@_src/components/top.menu.components';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '/';
  mainMenu: MainMenuComponent;
  topMenu: TopMenuComponent;

  constructor(page: Page) {
    super(page);
    this.topMenu = new TopMenuComponent(page);
    this.mainMenu = new MainMenuComponent(page);
  }
}
