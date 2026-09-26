import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { loadDishes } from "../api/api";
import DishList from "../components/DishList";
import BasketBar from "../components/BasketBar";

const CATEGORIES = [
  "All Dishes",
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Fasting & Vegan / Tsom",
  "Raw & Cured Delicacies / Kitfo",
  "Beverages & Tej",
];

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const cat = params.get("cat") ?? "All Dishes";

  const { data, loading, error } = useFetch((s) => loadDishes(s), []);

  let filtered = data ?? [];
  if (cat !== "All Dishes") {
    filtered = filtered.filter((d) => d.category === cat);
  }
  if (query) {
    filtered = filtered.filter((d) =>
      d.nameEn.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return (
    <div className="page">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search dishes (Kitfo, Shiro, Tibs…)"
          value={query}
          onChange={(e) => {
            const next = new URLSearchParams(params);
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            setParams(next, { replace: true });
          }}
        />
      </div>
      <div className="chips">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={cat === c ? "chip on" : "chip"}
            onClick={() => {
              const next = new URLSearchParams(params);
              if (c === "All Dishes") next.delete("cat");
              else next.set("cat", c);
              setParams(next);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="panel panel--coral">
        <strong style={{ fontSize: "0.9rem" }}>
           Traditional Gursha Experience
        </strong>
        <p style={{ fontSize: "0.75rem", color: "var(--soft)", marginTop: 4 }}>
          Fresh pull of pure brown teff Injera served with warm water.
        </p>
      </div>

      {loading && <p className="spinner">Loading the menu…</p>}
      {error && <p className="err">{error}</p>}
      {filtered && <DishList dishes={filtered} />}

      <BasketBar />
    </div>
  );
}
