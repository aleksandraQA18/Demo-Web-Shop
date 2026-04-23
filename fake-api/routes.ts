import { DB } from '../fake-api/db';
import { Page, Request, Route } from '@playwright/test';

export async function setupRoutes(page: Page, db: DB): Promise<void> {
  await page.route(
    '**/api/products**',
    async (route: Route, request: Request) => {
      const url = new URL(request.url());
      const method = request.method();

      const id = Number(url.pathname.split('/').filter(Boolean).pop());
      const isIdRequest = !Number.isNaN(id);

      const inStockParam = url.searchParams.get('inStock');

      // -------------------------
      // GET ALL
      // -------------------------
      if (method === 'GET' && !isIdRequest) {
        let result = [...db.products];

        if (inStockParam !== null) {
          const inStock = inStockParam === 'true';
          result = result.filter((p) => p.inStock === inStock);
        }

        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(result),
        });
      }

      // -------------------------
      // GET BY ID
      // -------------------------
      if (method === 'GET' && isIdRequest) {
        const product = db.products.find((p) => p.id === id);

        if (!product) {
          return route.fulfill({ status: 404 });
        }

        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(product),
        });
      }

      return route.continue();
    },
  );
}
