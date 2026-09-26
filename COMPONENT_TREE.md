# Component Tree

## Structure

    App
      ErrorBoundary
        Routes
          Route "/" element Layout
            TopBar
            main
              ErrorBoundary
                Outlet
                  Home / Menu / DishDetail / Cart / Checkout / etc.
            BottomNav

## What each component owns

| Component | Own state | Reads from store | Props in |
|---|---|---|---|
| TopBar | none | cart items, auth user | none |
| BottomNav | none | none | none |
| DishCard | none | cart.addItem | dish |
| DishList | none | none | dishes |
| BasketBar | none | cart items | none |
| Home | none | none | none |
| Menu | none | none | none |
| DishDetail | qty | cart.addItem | none |
| Cart | none | cart items + actions | none |
| Checkout | form state | cart items + clear | none |
| OrderConfirmation | none | order store | none |
| Login | form state | auth signIn | none |
| Register | form state | auth register | none |
| Account | none | auth user + signOut | none |
| ErrorBoundary | error | none | children |
