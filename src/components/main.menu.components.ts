import { CategoryPage } from '../pages/category.page';
import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  booksButton: Locator;
  computersButton: Locator;
  electronicsButton: Locator;
  cellPhoneButton: Locator;
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
    this.cellPhoneButton = this.page.locator(
      '.top-menu a[href="/cell-phones"]',
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

  async goToBooks(): Promise<CategoryPage> {
    await this.booksButton.click();
    return new CategoryPage(this.page);
  }

  async goToComputers(): Promise<CategoryPage> {
    await this.computersButton.click();
    return new CategoryPage(this.page);
  }

  async goToElectronics(): Promise<CategoryPage> {
    await this.electronicsButton.click();
    return new CategoryPage(this.page);
  }

  async goToCellPhones(): Promise<CategoryPage> {
    await this.electronicsButton.hover();
    await this.cellPhoneButton.click();
    return new CategoryPage(this.page);
  }

  async goToApparelShoes(): Promise<CategoryPage> {
    await this.apparelShoesButton.click();
    return new CategoryPage(this.page);
  }

  async goToDigitalDownloads(): Promise<CategoryPage> {
    await this.digitalDownloadsButton.click();
    return new CategoryPage(this.page);
  }

  async goToJewelry(): Promise<CategoryPage> {
    await this.jewelryButton.click();
    return new CategoryPage(this.page);
  }

  async goToGiftCards(): Promise<CategoryPage> {
    await this.giftCardsButton.click();
    return new CategoryPage(this.page);
  }
}
