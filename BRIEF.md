# Mesob House — Capstone

## The Problem

Ordering Ethiopian food online is harder than it should be. Existing
restaurant apps treat the menu as a list of anonymous items. They don't
show what a dish contains, they don't let you filter by fasting practices,
and they don't reflect the communal nature of the meal — the mesob, the
shared platter, the gursha.

## The User

A guest in Addis Ababa. Two modes:

1. Mobile browser, on the go. Wants to browse, order, and pay in under two
   minutes on a phone.
2. Desktop, at home. Wants to browse, plan a family meal, and place a
   larger order with specific dishes.

## Five Screens and Their Data

### 1. Home

Purpose: Introduce the restaurant and surface today's specials.

Data read: the 5 dishes flagged isSpecial, plus the Great Mesob Feast
centerpiece.

Data written: nothing.

### 2. Menu

Purpose: The full catalog. Browse, filter, search.

Data read: all 20 dishes. Filters come from the URL query string.

Data written: the URL query (?q=, ?cat=). The cart when a dish is added.

### 3. Dish Detail

Purpose: Everything about one dish before adding it to the cart.

Data read: one dish by slug from the URL. Includes name, description,
ingredients, servings, price, image.

Data written: the cart with the selected quantity.

### 4. Cart

Purpose: Confirm what's in the basket before checkout.

Data read: cart items from Zustand. Auth user from Zustand.

Data written: cart mutations (increment, decrement, remove).

### 5. Checkout

Purpose: Collect delivery details and place the order.

Data read: cart items, auth user for prefilling name and phone.

Data written: the order store with a real order ID, then the cart is
cleared, then navigation to the receipt.

## The Rules

- Cart and Auth live in Zustand stores with persistence.
- Every form is validated with Zod via React Hook Form.
- Every heavy route is lazy-loaded.
- Every page is wrapped in an Error Boundary.
- A cold URL load of any route renders the correct screen.

## What Is Out of Scope

- A real backend. All data is mocked from JSON.
- Real payments. Payment methods are illustrative.
- Order history across sessions.
