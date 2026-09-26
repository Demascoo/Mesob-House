# Mesob House — Project Brief

## The Idea

Mesob House is a digital home for a fictional Ethiopian restaurant in Addis Ababa.
The goal is not a landing page but a working
ordering system: a real menu, a real cart, real accounts, and a real
checkout — all without a single page reload.


## The User

A guest in Addis Ababa browsing the menu on a phone, or a returning member
ordering  . Both must be able to complete anorder in under two minutes.

## The Screens

1. Home — hero, chef specials, and the Great Mesob Feast centerpiece.
2. Menu — 20 dishes, search, and six category filters.
3. Dish Detail — name in English and Amharic, ingredients, servings,
   quantity selector, and add-to-cart.
4. Cart — line items, quantity controls.
5. Checkout — contact, delivery address, payment method, order summary.
6. Order Confirmation — a receipt with order number, ETA, and items.
7. Login — email and password with validation.
8. Register — full name, phone, email, and password with validation.
9. Account — profile view and sign out.

## What Success Looks Like

- A cold URL load of any route renders the correct screen.
- Adding a dish, refreshing, and returning to the cart preserves the order.
- Registering and signing in both work and store real accounts.
- Placing an order clears the cart and shows a receipt.
- A dead component fails alone — the shell survives.

## What Is Out of Scope

- A real backend. All data comes from two JSON files and mock API promises.
- Real payments. Payment methods are illustrative.
- Persistent order history beyond the current session.