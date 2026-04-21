import { CategoryPage } from './category.page';
import { Page } from '@playwright/test';

export class BooksPage extends CategoryPage {
  url = '/books';

  constructor(page: Page) {
    super(page);
  }
}
