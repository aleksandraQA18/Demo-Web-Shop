import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class WishListPage extends BasePage {
  url = '/wishlist';

  constructor(page: Page) {
    super(page);
  }
}
