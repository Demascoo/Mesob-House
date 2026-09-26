import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const cls = ({ isActive }) =>
    isActive ? "bottomnav__link on" : "bottomnav__link";

  return (
    <nav className="bottomnav">
      <NavLink to="/" className={cls} end>
        <span className="bottomnav__icon">🔥</span>Specials
      </NavLink>
      <NavLink to="/menu" className={cls}>
        <span className="bottomnav__icon">🍴</span>Menu
      </NavLink>
      <NavLink to="/cart" className={cls}>
        <span className="bottomnav__icon">🛍</span>Cart
      </NavLink>
      <NavLink to="/account" className={cls}>
        <span className="bottomnav__icon">👤</span>Account
      </NavLink>
    </nav>
  );
}
