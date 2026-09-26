# State Placement Table

| State | Lives in | Why there | Lifetime |
|---|---|---|---|
| Cart items | Zustand cartStore | Needed by many screens | localStorage |
| Cart total | Derived | Cannot disagree with items | Per render |
| Auth user | Zustand authStore | Needed by many screens | localStorage |
| Registered accounts | localStorage | Persists between visits | Persistent |
| Last order | Zustand orderStore | Only receipt needs it | Memory |
| Current page | URL | Shareable, back button | Per navigation |
| Dish slug | URL param | Shareable link | Per navigation |
| Search query | URL query | Shareable | Per navigation |
| Category filter | URL query | Shareable | Per navigation |
| Login form fields | React Hook Form | Only login page | Component |
| Register form fields | React Hook Form | Only register page | Component |
| Checkout form fields | React Hook Form | Only checkout page | Component |
| Form errors | Derived by Zod | Cannot disagree | Per render |
| Quantity on detail | useState in DishDetail | Only that page | Component |
| Error caught | useState in ErrorBoundary | Only that boundary | Until reset |
| Fetched dishes | useState in useFetch | Only caller | Component |
| Loading flag | useState in useFetch | Only caller | Component |
| Fetch error | useState in useFetch | Only caller | Component |

## Rules applied

- Closest common parent for local state.
- URL for shareable state.
- Global store for cross-screen state.
- Derived state is never stored.
- Server data stays out of the global store.
