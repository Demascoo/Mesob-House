import { Link, Navigate } from "react-router-dom";
import { useOrderStore } from "../store/orderStore";

export default function OrderConfirmation() {
  const order = useOrderStore((s) => s.lastOrder);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const placedAt = new Date(order.placedAt);
  const eta = new Date(placedAt.getTime() + 40 * 60 * 1000);

  const dateStr = placedAt.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeStr = placedAt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const etaStr = eta.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="page">
      <div
        className="panel panel--forest"
        style={{ textAlign: "center", padding: "32px 20px" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: 8 }}>🎉</div>
        <h2
          style={{
            fontFamily: "var(--display)",
            color: "var(--ivory)",
            fontSize: "1.6rem",
            marginBottom: 8,
          }}
        >
          Selam! Your feast is being prepared.
        </h2>
        <p style={{ color: "rgba(250,245,240,0.85)", fontSize: "0.85rem" }}>
          We've received your order and the kitchen has started cooking.
        </p>
      </div>
      <div className="panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 12,
          }}
        >
          <span className="eyebrow eyebrow--burgundy">Order Receipt</span>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--gold)",
              letterSpacing: 1,
            }}
          >
            #{order.id}
          </span>
        </div>

        <div className="summary-row">
          <span>Order Date</span>
          <span>{dateStr}</span>
        </div>
        <div className="summary-row">
          <span>Placed At</span>
          <span>{timeStr}</span>
        </div>
        <div className="summary-row">
          <span>Estimated Arrival</span>
          <span style={{ fontWeight: 600, color: "var(--forest)" }}>
            ~{etaStr}
          </span>
        </div>
        <div className="summary-row">
          <span>Payment Method</span>
          <span>Telebirr</span>
        </div>
      </div>
      <div className="panel panel--coral">
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>📍</span>
          <strong style={{ fontSize: "0.9rem" }}>Delivering To</strong>
        </div>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>{order.name}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--soft)" }}>
          {order.phone}
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--soft)", marginTop: 4 }}>
          {order.address}
        </p>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: 12 }}>Order Items</h3>
        {order.items.map((i) => (
          <div key={i.id} className="order-mini">
            <div className="order-mini__name">
              {i.name} × {i.qty}
            </div>
            <div className="order-mini__price">
              ETB {(i.price * i.qty).toLocaleString()}
            </div>
          </div>
        ))}

        <div className="summary-row" style={{ marginTop: 12 }}>
          <span>Items Subtotal</span>
          <span>ETB {order.subtotal.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Courier Dispatch</span>
          <span>ETB {order.dispatchFee.toLocaleString()}</span>
        </div>
        <div className="cart-total">
          <span style={{ fontWeight: 600 }}>Total Paid</span>
          <span className="cart-total__amount">
            ETB {order.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* What's next */}
      <div className="panel panel--gold">
        <strong style={{ fontSize: "0.9rem" }}>What Happens Next?</strong>
        <ol
          style={{
            marginTop: 10,
            paddingLeft: 20,
            fontSize: "0.82rem",
            color: "var(--soft)",
            lineHeight: 1.7,
          }}
        >
          <li>Your order is confirmed — no further action needed.</li>
          <li>A rider will call {order.phone} when they arrive at the gate.</li>
          <li>
            Your injera is served in an insulated clay pak to keep it steaming
            hot.
          </li>
          <li>
            Please have your Telebirr or cash ready for the courier if paying on
            delivery.
          </li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <Link to="/menu" className="btn btn--ghost">
          Order More
        </Link>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.72rem",
          color: "var(--muted)",
          marginTop: 20,
        }}
      >
        Need help? Call the kitchen desk at{" "}
        <a href="tel:+251911234567" style={{ color: "var(--burgundy)" }}>
          +251 911 234 567
        </a>
      </p>
    </div>
  );
}
