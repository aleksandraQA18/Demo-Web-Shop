import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify application main pages', () => {
  test('home page title DWS-01-01', { tag: '@smoke' }, async ({ page }) => {
    //Arrange
    const homePage = new HomePage(page);
    const expectedTitle = 'Demo Web Shop';

    //Act
    await homePage.goto();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toEqual(expectedTitle);
  });
});
