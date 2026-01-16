import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class BooksPage extends BasePage {
  url = '/books';

  constructor(page: Page) {
    super(page);
  }
}
