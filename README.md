# Demo Web Shop - Playwright Test Suite

Test automation project for the **Demo Web Shop** application using **Playwright** framework written in TypeScript.

## 📝 Overview

This project provides comprehensive end-to-end and integration testing for a demo e-commerce web shop. It includes:

- Smoke tests for critical user flows
- Integration tests for user authentication and shopping workflows
- Page Object Model (POM) architecture for maintainability
- Reusable test data and components

> ⚠️ **Note:** This project does not have a backend API. Test data is populated from static files in `src/test-data/` directory for learning and demonstration purposes.

## 🛠 Tech Stack

- **Playwright** v1.57.0 - Cross-browser automation framework
- **TypeScript** - Type-safe test code
- **ESLint** - Code quality and style enforcement
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd demo-web-shop-pw
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   BASE_URL=https://demowebshop.tricentis.com
   EMAIL=test@example.com
   PASSWORD=testPassword123
   ```

## 🚀 Running Tests

### Run all tests

```bash
npm test
```

### Run smoke tests only

```bash
npm run test:smoke
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Run tests with UI mode

```bash
npm run test:ui
```

### View test report

```bash
npm run show-report
```

## 📂 Project Structure

```
src/
├── components/           # Reusable UI components (menu, navigation)
│   ├── main.menu.components.ts
│   └── top.menu.components.ts
├── pages/               # Page Object Models
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── cart.page.ts
│   ├── category.page.ts
│   ├── login.page.ts
│   └── register.page.ts
├── test-data/          # Static test data (NO API)
│   ├── products.ts     # Product fixtures
│   └── user.data.ts    # User credentials
├── factory/            # Test data builders
│   └── register.user.ts
├── models/             # Data models
│   ├── product.model.ts
│   └── user.model.ts
└── env.config.ts     # Environment configuration

tests/
├── smoke/              # Critical path tests
│   ├── cart.spec.ts
│   └── navigation.spec.ts
├── integration/        # Feature workflow tests
│   ├── login.spec.ts
│   └── register.spec.ts
└── e2e/               # End-to-end scenarios
    └── cart-e2e.spec.ts
```

## 🧪 Test Categories

Tests are organized with tags for selective execution:

- **@smoke** - Fast critical path tests (happy path flows)
- **@regression** - Broader coverage tests
- **@integration** - Feature interaction tests

## 📊 Test Data Strategy

Since this project has **no backend API**, test data is managed statically:

- **Products**: Predefined list in `src/test-data/products.ts`
- **User Credentials**: Test accounts in `src/test-data/user.data.ts`
- **Builders**: Factory classes in `src/factory/` generate test users as needed

Test data is imported directly into test files and ensures consistent, reproducible test execution.

## 🎓 Learning Resources

This project is designed for **learning and educational purposes**. It demonstrates:

- Test automation best practices
- TypeScript in test automation
- Page Object Model implementation
- Test organization and reporting
