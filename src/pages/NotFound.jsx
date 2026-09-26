import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="panel" style={{ padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>🍽️</div>
        <h2 style={{ marginTop: 12, fontFamily: "var(--display)" }}>
          404 — Off the Menu
        </h2>
        <p style={{ color: "var(--soft)", marginTop: 8, fontSize: "0.85rem" }}>
          That page isn't on our menu.
        </p>
        <Link
          to="/"
          className="btn"
          style={{
            marginTop: 20,
            display: "inline-flex",
            width: "auto",
            padding: "12px 24px",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
