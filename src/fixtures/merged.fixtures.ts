import { pagesObjectsTest } from '@_src/fixtures/pages.fixtures';
import { productsTest } from '@_src/fixtures/products.fixtures';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pagesObjectsTest, productsTest);

export { expect, productsTest } from '@playwright/test';
