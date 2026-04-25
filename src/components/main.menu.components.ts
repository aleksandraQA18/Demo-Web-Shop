import { Locator, Page } from '@playwright/test';

export type MainMenuLink =
  | 'books'
  | 'computers'
  | 'electronics'
  | 'apparel-shoes'
  | 'digital-downloads'
  | 'jewelry'
  | 'gift-cards';

export class MainMenuComponent {
  booksButton: Locator;
  computersButton: Locator;
  electronicsButton: Locator;
  apparelShoesButton: Locator;
  digitalDownloadsButton: Locator;
  jewelryButton: Locator;
  giftCardsButton: Locator;

  constructor(private page: Page) {
    this.booksButton = this.page.locator('.top-menu a[href="/books"]');
    this.computersButton = this.page.locator('.top-menu a[href="/computers"]');
    this.electronicsButton = this.page.locator(
      '.top-menu a[href="/electronics"]',
    );
    this.apparelShoesButton = this.page.locator(
      '.top-menu a[href="/apparel-shoes"]',
    );
    this.digitalDownloadsButton = this.page.locator(
      '.top-menu a[href="/digital-downloads"]',
    );
    this.jewelryButton = this.page.locator('.top-menu a[href="/jewelry"]');
    this.giftCardsButton = this.page.locator('.top-menu a[href="/gift-cards"]');
  }

  async clickMainMenuCategory(category: MainMenuLink): Promise<void> {
    switch (category) {
      case 'books':
        await this.booksButton.click();
        break;
      case 'computers':
        await this.computersButton.click();
        break;
      case 'electronics':
        await this.electronicsButton.click();
        break;
      case 'apparel-shoes':
        await this.apparelShoesButton.click();
        break;
      case 'digital-downloads':
        await this.digitalDownloadsButton.click();
        break;
      case 'jewelry':
        await this.jewelryButton.click();
        break;
      case 'gift-cards':
        await this.giftCardsButton.click();
        break;
    }
  }
}
