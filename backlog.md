1️⃣ BACKLOG – PROJECT DEMO WEB SHOP

📝 TO DO
✅ DONE

🔹 EPIC 1: Core Navigation & Home

✅ DWS-101 Home page loads successfully [SMOKE]
✅ DWS-102 User can access register, log in, cart and wishlist from top menu [SMOKE]
✅ DWS-103 User can navigate to categories from header category menu [SMOKE]
✅ DWS-104 User can navigate to cart from notification bar [SMOKE]
✅ DWS-105 Clicking logo redirects to home page [SMOKE]
✅ DWS-106 Navigation preserves application state (cart count remains consistent) [SMOKE] [REGRESSION]

🔹 EPIC 2: Category & Product Listing

✅ DWS-201 Should display correct details for product [REGRESSION]
✅ DWS-202 Product is clickable and opens product details page [SMOKE]
✅ DWS-203 Out-of-stock products cannot be added to cart [REGRESSION]
✅ DWS-204 User can add product to cart directly from listing [SMOKE]
✅ DWS-205 Pagination / sorting does not break product visibility [REGRESSION]
✅ DWS-206 Mini cart should display correct product name [REGRESSION]
✅ DWS-207 DWS-207 Mini cart should display correct price and quantity [REGRESSION]

🔹 EPIC 3: Product Details

✅ DWS-301 Product details page displays correct data [SMOKE]
✅ DWS-302 Product price is consistent with listing page [REGRESSION]
✅ DWS-303 User can add available product to cart from product page [SMOKE]
✅ DWS-304 Adding product updates cart counter correctly [SMOKE]
✅ DWS-305 Product availability affects "Add to cart" behavior [REGRESSION]

🔹 EPIC 4: Cart Management

✅ DWS-401 Cart reflects correct price and quantity [REGRESSION]
✅ DWS-402 User can change product quantity [SMOKE]
✅ DWS-403 Updating quantity recalculates total price [REGRESSION]
✅ DWS-404 User can remove product from cart [SMOKE]
📝 DWS-405 Cart data persists after page refresh [REGRESSION]

🔹 EPIC 5: Checkout (🔥 CRITICAL)

📝 DWS-501 User can proceed to checkout from cart [SMOKE][E2E]
📝 DWS-502 Guest user can complete checkout [E2E]
📝 DWS-503 Logged-in user can complete checkout [E2E]
📝 DWS-504 User must provide valid billing details [REGRESSION]
📝 DWS-505 Invalid form data shows validation errors [REGRESSION]
📝 DWS-506 User can select shipping method [REGRESSION]
📝 DWS-507 User can select payment method [REGRESSION]
📝 DWS-508 Order confirmation is displayed after successful checkout [SMOKE][E2E]
📝 DWS-509 Order summary contains correct products and pricing [E2E]

🔹 EPIC 6: Authentication

✅ DWS-601 Successful user registration [SMOKE]
✅ DWS-602 Error message for invalid email during registration [REGRESSION]
✅ DWS-603 Error message for weak password [REGRESSION]
📝 DWS-604 Duplicate email registration is blocked [REGRESSION]
✅ DWS-605 User can login with valid credentials [SMOKE]
✅ DWS-606 Error message for invalid login credentials [REGRESSION]
📝 DWS-607 User session persists after login [REGRESSION]
📝 DWS-608 User can logout successfully [SMOKE]

🔹 EPIC 7: Data Consistency

📝 DWS-701 Product price is consistent across all pages [REGRESSION][E2E]
📝 DWS-702 Cart total equals sum of product prices × quantity [REGRESSION]
📝 DWS-703 Cart icon counter matches actual number of items [SMOKE]
📝 DWS-704 Order summary matches cart data [REGRESSION][E2E]

🔹 EPIC 8: Negative & Edge Cases

📝 DWS-801 User cannot proceed to checkout with empty cart [REGRESSION]
📝 DWS-802 User cannot add invalid quantity [REGRESSION]
📝 DWS-803 System handles page refresh during cart usage [REGRESSION]
📝 DWS-804 Browser navigation does not break flow [REGRESSION]
📝 DWS-805 Special characters in forms are handled correctly [REGRESSION]
📝 DWS-806 Very long input values are validated [REGRESSION]

🔹 EPIC 9: Basic Non-Functional

📝 DWS-901 Key pages load within acceptable time [REGRESSION]
📝 DWS-902 No critical JS errors in console [REGRESSION]
📝 DWS-903 Basic accessibility works (focus, labels, interactions) [REGRESSION]
