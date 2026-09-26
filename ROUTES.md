# Route Map

## Public Routes

| Path | Screen | File |
|---|---|---|
| / | Home | src/pages/Home.jsx |
| /menu | Menu | src/pages/Menu.jsx |
| /menu/:slug | Dish Detail | src/pages/DishDetail.jsx |
| /cart | Cart | src/pages/Cart.jsx |
| /login | Sign In | src/pages/Login.jsx |
| /register | Create Account | src/pages/Register.jsx |
| /order-confirmation | Receipt | src/pages/OrderConfirmation.jsx |
| * | Not Found | src/pages/NotFound.jsx |

## Protected Routes

| Path | Screen | File | Guard |
|---|---|---|---|
| /checkout | Checkout | src/pages/Checkout.jsx | RequireAuth |
| /account | Account | src/pages/Account.jsx | RequireAuth |

## Layout Structure

    App
      ErrorBoundary
        Routes
          Route "/" element Layout
            Layout
              TopBar
              main
                ErrorBoundary
                  Outlet
              BottomNav

## URL Parameters

| Route | Param | Read by | Used for |
|---|---|---|---|
| /menu/:slug | slug | useParams | Look up a single dish |

## Query Strings

| Route | Query | Read by | Used for |
|---|---|---|---|
| /menu?q=kitfo | q | useSearchParams | Search filter |
| /menu?cat=Tibs | cat | useSearchParams | Category filter |

## Guards & Redirects

| Trigger | Action |
|---|---|
| Guest visits /checkout | Redirect to /login |
| Guest visits /account | Redirect to /login |
| Signed in after guard bounce | Redirect to original destination |
| Order placed | navigate to /order-confirmation with replace |
| /order-confirmation without an order | Redirect to / |

## Lazy-Loaded Routes

Lazy: /menu/:slug, /cart, /checkout, /order-confirmation, /login,
/register, /account, and the 404 page.

Eager: / and /menu.

## State Management

| Store | File | Persists |
|---|---|---|
| useCartStore | src/store/cartStore.js | localStorage |
| useAuthStore | src/store/authStore.js | localStorage |
| useOrderStore | src/store/orderStore.js | memory |

## Data Sources

| File | Feeds |
|---|---|
| src/data/menu.json | 20-dish menu |
| src/data/specials.json | 5 chef specials |
