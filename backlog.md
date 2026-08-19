BACKLOG – PROJECT DEMO WEB SHOP


- 📝 TO DO
- ✅ DONE
  

🔹 EPIC 1: Core Navigation & Home

- ✅ DWS-101 Home page loads successfully [SMOKE]
- ✅ DWS-102 User can access register, log in, cart and wishlist from top menu [SMOKE]
- ✅ DWS-103 User can navigate to main categories from header category menu [SMOKE]
- ✅ DWS-104 User can navigate to cart from notification bar [SMOKE]
- ✅ DWS-105 User can return to the home page by clicking the logo [SMOKE]
- ✅ DWS-106 Cart count is preserved during navigation [SMOKE] [REGRESSION]

🔹 EPIC 2: Category & Product Listing

- ✅ DWS-201 Product listing displays correct details for product [REGRESSION]
- ✅ DWS-202 User can open product details from the listing [SMOKE]
- ✅ DWS-203 User cannot add an out-of-stock product to cart [REGRESSION]
- ✅ DWS-204 User can add a product to cart from the listing [SMOKE]
- ✅ DWS-205 Product remains visible after pagination or sorting [REGRESSION]
- ✅ DWS-206 Mini cart displays the correct product name [REGRESSION]
- ✅ DWS-207 Mini cart displays the correct price and quantity [REGRESSION]

🔹 EPIC 3: Product Details

- ✅ DWS-301 Product details page displays correct data [SMOKE]
- ✅ DWS-302 Product price matches the listing page [REGRESSION]
- ✅ DWS-303 User can add an available product to cart [SMOKE]
- ✅ DWS-304 Cart counter is updated after adding a product [SMOKE]
- ✅ DWS-305 Product availability affects "Add to cart" behavior [REGRESSION]

🔹 EPIC 4: Cart Management

- ✅ DWS-401 Cart displays the correct price and quantity [REGRESSION]
- ✅ DWS-402 User can change product quantity [SMOKE]
- ✅ DWS-403 Cart total is recalculated after changing quantity [REGRESSION]
- ✅ DWS-404 User can remove product from cart [SMOKE]
- ✅ DWS-405 Cart data persists after page refresh [REGRESSION]

🔹 EPIC 5: Checkout (🔥 CRITICAL)

- ✅ DWS-501 Guest user can complete checkout [E2E]
- ✅ DWS-502 Newly registered user can complete checkout [E2E]
- 📝 DWS-503 User must provide valid billing details [REGRESSION]
- 📝 DWS-504 Invalid form data shows validation errors [REGRESSION]

🔹 EPIC 6: Authentication

- ✅ DWS-601 User can register with valid data [SMOKE]
- ✅ DWS-602 User cannot register with invalid email [REGRESSION]
- ✅ DWS-603 User cannot register with weak password [REGRESSION]
- 📝 DWS-604 Duplicate email registration is blocked [REGRESSION]
- ✅ DWS-605 User can log in with valid credentials [SMOKE]
- ✅ DWS-606 User cannot log in with invalid credentials [REGRESSION]
- ✅ DWS-607 User cannot log in with invalid password [REGRESSION]
- 📝 DWS-608 User can logout successfully [SMOKE]

🔹 EPIC 7: Data Consistency

- 📝 DWS-701 Product price is consistent across all pages [REGRESSION][E2E]
- 📝 DWS-702 Cart total equals sum of product prices × quantity [REGRESSION]
- 📝 DWS-703 Cart icon counter matches actual number of items [SMOKE]
- 📝 DWS-704 Order summary matches cart data [REGRESSION][E2E]

🔹 EPIC 8: Negative & Edge Cases

- 📝 DWS-801 User cannot proceed to checkout with empty cart [REGRESSION]
- 📝 DWS-802 User cannot add invalid quantity [REGRESSION]
- 📝 DWS-803 System handles page refresh during cart usage [REGRESSION]
- 📝 DWS-804 Browser navigation does not break flow [REGRESSION]
- 📝 DWS-805 Special characters in forms are handled correctly [REGRESSION]
- 📝 DWS-806 Very long input values are validated [REGRESSION]
