import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { loadSpecials, loadDish } from "../api/api";
import DishList from "../components/DishList";

const CATS = ["All", "Poultry", "Fasting / Tsom"];

export default function Home() {
  const [cat, setCat] = useState("All");

  const { data, loading, error } = useFetch((s) => loadSpecials(s), []);
  const { data: hero } = useFetch((s) => loadDish("great-mesob-feast", s), []);

  return (
    <div className="page">
      <div className="notice-bar">
        <span>
          ☯ Tsom / Fasting Observance
        </span>
        <Link to="/menu">
            See Fasting Specialties →
        </Link>
      </div>

      <section className="home-hero">
        <div className="hero-visual">
          {hero?.image && (
            <img src={hero.image} alt={hero.nameEn || "Mesob Feast"} />
          )}
          <Link
            to={hero ? `/menu/${hero.slug}` : "/menu"}
            className="hero-card"
          >
            <div>
              <small>CENTERPIECE</small>
              <strong>{hero?.nameEn ?? "Great Mesob Feast"}</strong>
            </div>
          </Link>
        </div>

        <div>
          <p className="eyebrow eyebrow--gold">
            TRADITIONAL HABESHA HEARTH
          </p>
          <h1 className="hero-title">
            Communal Warmth,
            <br />
            <em>Slow-Cooked Heritage.</em>
          </h1>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn--inline">
              Explore Today's Specials
            </Link>
            <Link to="/menu" className="btn btn--ghost btn--inline">
              Full  Menu
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat__value">100%</div>
              <div className="hero-stat__label">Brown &amp; White Teff</div>
            </div>
            <div>
              <div className="hero-stat__value">6+ Hours</div>
              <div className="hero-stat__label">Slow Stew Caramels</div>
            </div>
            <div>
              <div className="hero-stat__value">Gursha</div>
              <div className="hero-stat__label">Hospitality Shared</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow--burgundy"> FROM THE CLAY POTS</p>
          <h2 className="section-head__title">Today's Curated Chef Specials</h2>
          <p className="section-head__meta">
            Carefully balanced stews prepared at dawn using our matriarch's
            40-spice blend.
          </p>
        </div>
      </div>
      {loading && <p className="spinner">Loading today's specials…</p>}
      {error && <p className="err">{error}</p>}
      {data && <DishList dishes={data} />}
    </div>
  );
}
