import { DB, createDB } from '../../fake-api/db';
import { setupRoutes } from '../../fake-api/routes';
import { test as base, expect } from '@playwright/test';

type Fixtures = {
  db: DB;
};

export const test = base.extend<Fixtures>({
  db: async ({ page }, use) => {
    const db = createDB();

    await setupRoutes(page, db);

    await use(db);
  },
});

export { expect };
