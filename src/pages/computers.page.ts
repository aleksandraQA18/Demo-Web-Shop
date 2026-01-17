import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ComputersPage extends BasePage {
  url = '/computers';

  constructor(page: Page) {
    super(page);
  }
}
