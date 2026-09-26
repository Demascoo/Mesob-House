import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const inc = useCartStore((s) => s.inc);
  const dec = useCartStore((s) => s.dec);
  const remove = useCartStore((s) => s.remove);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!items.length) {
    return (
      <div className="page">
        <div className="panel" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>🛍</div>
          <h2 style={{ marginTop: 12 }}>Your basket is empty</h2>
          <p
            style={{ color: "var(--soft)", marginTop: 8, fontSize: "0.85rem" }}
          >
            Add a few dishes to begin your feast.
          </p>
          <Link to="/menu" className="btn" style={{ marginTop: 20 }}>
            Browse the Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="step-bar">
        <span className="step-bar__num">1</span>
        <span className="step-bar__current">STEP 1 OF 3</span>
        <span className="step-bar__trail">
          <strong>BASKET</strong> › DELIVERY › DONE
        </span>
      </div>

      <h1 className="page-title">Your Gursha Basket</h1>
      <p className="page-subtitle">{items.length} Delicacies</p>
      {items.map((i) => (
        <div key={i.id} className="cart-line">
          <div className="cart-line__info">
            <h4 className="cart-line__name">{i.name}</h4>
            <p className="cart-line__price">ETB {i.price * i.qty}</p>
          </div>
          <div className="cart-line__qty">
            <button onClick={() => dec(i.id)}>−</button>
            <span>{i.qty}</span>
            <button onClick={() => inc(i.id)}>+</button>
          </div>
          <button
            className="cart-line__remove"
            onClick={() => remove(i.id)}
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ))}

      <button
        className="btn"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout — ETB {total.toLocaleString()} →
      </button>
      <div className="panel">
        <p className="eyebrow eyebrow--burgundy">✍ Kitchen Note (Optional)</p>
        <textarea
          rows={3}
          placeholder="Please pack extra rolled injera in separate banana leaves."
          className="textarea"
          style={{ marginTop: 10 }}
        />
      </div>
    </div>
  );
}
