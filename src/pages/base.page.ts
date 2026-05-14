import { Page } from '@playwright/test';

export class BasePage {
  url = '/';

  constructor(protected page: Page) {}

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
