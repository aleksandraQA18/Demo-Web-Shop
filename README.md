# Demo Web Shop — QA Automation

Playwright + TypeScript test automation project for an e-commerce application.

## About the project

This project was created to practice and demonstrate UI test automation using Playwright and TypeScript.

The test suite covers selected user journeys of the Demo Web Shop, with a focus on registration, authentication, shopping cart and checkout flows.

The project also demonstrates the use of Page Object Model, custom fixtures, test data generation and different types of automated tests.

## Test coverage

### Registration & Login

- User registration
- User login
- Authentication setup using Playwright `storageState`

### Product & Cart

- Product navigation
- Adding products to the cart
- Cart management
- Cart validation

### Checkout

#### Guest customer

The test verifies the checkout flow for a guest customer:

`Product → Cart → Checkout → Guest checkout → Billing → Order confirmation`

The test validates, among other things:

- selected product
- product price
- checkout flow
- successful order confirmation

#### Registered customer

The test covers the checkout flow for a newly registered customer:

`Product → Cart → Checkout → Registration → Checkout → Billing → Order confirmation`

A new test user is generated for each test run, so the test does not depend on a shared customer account.

## Test architecture

The project uses the **Page Object Model** to separate page interactions from test scenarios.

### Page Objects

Page classes contain locators and actions related to individual pages, for example:

- `LoginPage`
- `RegisterPage`
- `ProductPage`
- `CartPage`
- `CheckoutPage`
- `OrderCompletedPage`

### Fixtures

Custom Playwright fixtures are used for reusable test setup.

For example, the `getProductAndNavigate` fixture prepares a product and navigates to its product page.

Business actions such as adding a product to the cart remain visible in the test scenario.

### Test data

Test data is separated from test logic and generated using Faker where unique data is required.

The project uses TypeScript interfaces to describe test data, including customer and billing address data.

## Project structure

```text
├── components/
├── data/
├── fixtures/
├── models/
├── pages/
├── tests/
│   ├── e2e/
│   ├── integration/
│   ├── setup/
│   └── smoke/
├── utils/
├── playwright.config.ts
└── package.json
```

## Locator strategy

The tests use Playwright locators with an emphasis on readable and stable selectors, including:

- `getByRole`
- `getByText`
- stable CSS selectors / IDs where appropriate

Example:

```ts
page.getByRole('link', { name: 'Addresses' });
```

For form controls with stable IDs:

```ts
page.locator('#BillingNewAddress_CountryId');
```

## Technologies

- **Playwright**
- **TypeScript**
- **Faker** — test data generation
- **ESLint**
- **Prettier**
- **Husky**

## Running the tests

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run a specific test file:

```bash
npx playwright test <path-to-test>
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

## Test reports

Playwright HTML Reporter is configured to provide test execution results and debugging information after the test run.

## About me

**Aleksandra Kowalska**  
QA Specialist | API & Test Automation

This project is part of my QA automation portfolio and reflects my practical work with Playwright, TypeScript and test automation.
