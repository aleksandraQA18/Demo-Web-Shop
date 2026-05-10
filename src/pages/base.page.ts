import { MainMenuComponent } from '../components/main.menu.components';
import { TopMenuComponent } from '../components/top.menu.components';
import { Page } from '@playwright/test';

export class BasePage {
  url = '';
  mainMenu: MainMenuComponent;
  topMenu: TopMenuComponent;

  constructor(protected page: Page) {
    this.topMenu = new TopMenuComponent(page);
    this.mainMenu = new MainMenuComponent(page);
  }

  async goto(url?: string): Promise<void> {
    await this.page.goto(url ?? this.url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }
}
