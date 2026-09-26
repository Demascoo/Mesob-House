import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { loadDish } from "../api/api";
import { useCartStore } from "../store/cartStore";

export default function DishDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch((s) => loadDish(slug, s), [slug]);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  if (loading) return <p className="spinner">Loading…</p>;
  if (error) return <p className="err">{error}</p>;
  if (!data) return null;

  const total = data.priceETB * qty;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(data);
    navigate("/cart");
  }

  return (
    <div className="page">
      <Link to="/menu" className="back-link">
        ← Back
      </Link>

      <div className="detail-hero">
        <img src={`/images/${data.slug}.jpg`} alt={data.nameEn} />
        <div className="detail-hero__tags">
          {data.isSpecial && (
            <span className="pill-tag pill-tag--gold">
              Chef's Special Today
            </span>
          )}
          {data.isFasting && (
            <span className="pill-tag pill-tag--green">Fasting • Vegan</span>
          )}
        </div>
      </div>

      <div className="detail-head">
        <div>
          <h1 className="detail-head__name">{data.nameEn}</h1>
          {data.nameAm && <p className="detail-head__amharic">{data.nameAm}</p>}
        </div>
        <div className="detail-head__price">
          ETB {data.priceETB}
          <small>Taxes included</small>
        </div>
      </div>

      <div className="detail-stats">
        <span>★ 4.98</span>
        <span>{data.category}</span>
        <span>{data.servings}</span>
      </div>

      <p className="detail-desc">{data.description}</p>

      {data.ingredients?.length > 0 && (
        <div className="panel panel--coral" style={{ marginTop: 16 }}>
          <p className="eyebrow eyebrow--burgundy">🥘 Ingredients</p>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}
          >
            {data.ingredients.map((ing) => (
              <span
                key={ing}
                style={{
                  background: "var(--ivory)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: "0.7rem",
                  color: "var(--soft)",
                }}
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="sticky-add">
        <div className="qty">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
        <button className="btn" onClick={handleAdd}>
          🛍 Add to Basket — ETB {total}
        </button>
      </div>
    </div>
  );
}
