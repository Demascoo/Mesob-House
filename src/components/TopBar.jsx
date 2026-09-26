import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export default function TopBar() {
  const items = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const navClass = ({ isActive }) =>
    isActive ? "topnav__link on" : "topnav__link";

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <div className="brand__name">Mesob</div>
        <div className="brand__sub">HABESHA HOUSE</div>
      </Link>

      <nav className="topnav">
        <NavLink to="/menu" className={navClass}>
          Menu
        </NavLink>
        <NavLink to="/cart" className={navClass}>
          Order &amp; Cart
        </NavLink>
        <NavLink to="/checkout" className={navClass}>
          Delivery &amp; Checkout
        </NavLink>
      </nav>

      <div className="topbar__right">
        <Link to="/cart" className="cart-pill">
          <span className="cart-pill__count">{count} items</span>
          <span>
            <span className="cart-pill__label">ETB</span>
            <span className="cart-pill__amount">{total.toLocaleString()}</span>
          </span>
        </Link>

        {user ? (
          <Link to="/account" className="topbar__account">
            <span>Welcome</span>
            <strong>{user.name?.split(" ")[0] || "Account"}</strong>
          </Link>
        ) : (
          <div className="topbar__auth">
            <Link
              to="/login"
              className="topbar__auth-btn topbar__auth-btn--ghost"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="topbar__auth-btn topbar__auth-btn--solid"
            >
              Register
            </Link>
          </div>
        )}

        <Link to="/cart" className="cart-icon" aria-label="Cart">
          🛍
          {count > 0 && <span className="cart-icon__badge">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
