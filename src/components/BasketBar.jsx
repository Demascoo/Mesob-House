import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function BasketBar() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!count) return null;

  return (
    <Link to="/cart" className="basket-bar">
      <span className="basket-bar__icon">🛍</span>
      <div className="basket-bar__info">
        <strong>Selected: {count} items</strong>
        ETB {total.toLocaleString()}
      </div>
      <span className="basket-bar__view">View Basket →</span>
    </Link>
  );
}
