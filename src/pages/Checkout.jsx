import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { checkoutSchema } from "../validation/schemas";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: "",
    },
  });

  async function onSubmit(form) {
    await new Promise((r) => setTimeout(r, 800));
    const dispatchFee = 128;
    const order = {
      id: "MSB-" + Math.floor(100000 + Math.random() * 900000),
      placedAt: new Date().toISOString(),
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      subtotal,
      dispatchFee,
      total: subtotal + dispatchFee,
      name: form.name,
      phone: form.phone,
      address: form.address,
      paymentMethod: "Telebirr",
    };

    placeOrder(order);
    clear();
    navigate("/order-confirmation", { replace: true });
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="panel" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>🛍</div>
          <h2 style={{ marginTop: 12 }}>Your basket is empty</h2>
          <p
            style={{ color: "var(--soft)", marginTop: 8, fontSize: "0.85rem" }}
          >
            Add a dish before checking out.
          </p>
          <Link to="/menu" className="btn" style={{ marginTop: 20 }}>
            Browse the Menu
          </Link>
        </div>
      </div>
    );
  }

  const dispatchFee = 128;
  const total = subtotal + dispatchFee;

  return (
    <div className="page">
      <div className="step-bar">
        <span className="step-bar__num">2</span>
        <span className="step-bar__current">STEP 2 OF 3</span>
        <span className="step-bar__trail">Delivery &amp; Payment</span>
      </div>

      <h1 className="page-title">Delivery &amp; Payment</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="panel">
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>👤</span>
            <div>
              <strong style={{ fontSize: "0.95rem" }}>Recipient Contact</strong>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                For delivery updates &amp; Telegram OTP
              </p>
            </div>
          </div>

          <label className="field">
            <span className="field__label">Full Name</span>
            <input type="text" {...register("name")} />
            {errors.name && (
              <p className="field__error">{errors.name.message}</p>
            )}
          </label>

          <label className="field">
            <span className="field__label">
              Phone (Calls &amp; Telegram SMS)
            </span>
            <input
              type="tel"
              {...register("phone")}
              placeholder="0911 234 567"
            />
            {errors.phone && (
              <p className="field__error">{errors.phone.message}</p>
            )}
          </label>
        </div>

        <div className="panel">
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>📍</span>
            <div>
              <strong style={{ fontSize: "0.95rem" }}>Delivery Location</strong>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                Addis Ababa Metropolitan Area
              </p>
            </div>
          </div>

          <label className="field">
            <span className="field__label">Street, Building, Flat No.</span>
            <textarea
              rows={3}
              {...register("address")}
              placeholder="Behind Edna Mall, House No. 402, 3rd Floor"
            />
            {errors.address && (
              <p className="field__error">{errors.address.message}</p>
            )}
          </label>
        </div>

        <div className="panel">
          <h3 style={{ marginBottom: 12 }}>💳 Payment Method</h3>
          <div className="panel panel--coral" style={{ marginBottom: 10 }}>
            <strong style={{ fontSize: "0.9rem" }}>Telebirr</strong>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--soft)",
                marginTop: 2,
              }}
            >
              Instant app push &amp; SMS confirmation
            </p>
          </div>
          <div className="panel" style={{ marginBottom: 10 }}>
            <strong style={{ fontSize: "0.9rem" }}>CBE Birr</strong>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--soft)",
                marginTop: 2,
              }}
            >
              Commercial Bank of Ethiopia Direct
            </p>
          </div>
          <div className="panel">
            <strong style={{ fontSize: "0.9rem" }}>Cash / Wireless POS</strong>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--soft)",
                marginTop: 2,
              }}
            >
              Rider carries portable card terminal
            </p>
          </div>
        </div>

        <div className="panel">
          <h3 style={{ marginBottom: 12 }}>Order Summary</h3>
          {items.map((i) => (
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
            <span>ETB {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Courier Dispatch</span>
            <span>ETB {dispatchFee}</span>
          </div>
          <div className="cart-total">
            <span style={{ fontWeight: 600 }}>Total</span>
            <span className="cart-total__amount">
              ETB {total.toLocaleString()}
            </span>
          </div>
        </div>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting
            ? "Placing order…"
            : `Confirm Order & Pay ETB ${total.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
}
