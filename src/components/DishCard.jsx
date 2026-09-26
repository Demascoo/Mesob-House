import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function badgeFor(dish) {
  if (dish.isSpecial) return { label: "Chef Special", variant: "gold" };
  if (dish.isFasting) return { label: "100% Vegan", variant: "green" };
  return { label: "Highland Classic", variant: "burgundy" };
}

function DishCard({ dish }) {
  const addItem = useCartStore((s) => s.addItem);
  const badge = badgeFor(dish);

  const handleAdd = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(dish);
    },
    [addItem, dish],
  );

  return (
    <Link to={`/menu/${dish.slug}`} className="dish-card">
      <div className="dish-card__thumb">
        {dish.image ? (
          <img src={dish.image} alt={dish.nameEn} loading="lazy" />
        ) : null}
        <span
          className={`dish-card__thumb-tag dish-card__thumb-tag--${badge.variant}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="dish-card__body">
        <h3 className="dish-card__name">{dish.nameEn}</h3>
        <p className="dish-card__desc">{dish.description}</p>
        <p className="dish-card__spice">{dish.spiceLevel}</p>
        <div className="dish-card__bottom">
          <span className="dish-card__price">ETB {dish.priceETB}</span>
          <button
            className="dish-card__add"
            onClick={handleAdd}
            aria-label={`Add ${dish.nameEn} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    nameEn: PropTypes.string.isRequired,
    priceETB: PropTypes.number.isRequired,
    category: PropTypes.string,
    spiceLevel: PropTypes.string,
    isSpecial: PropTypes.bool,
    isFasting: PropTypes.bool,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default memo(DishCard);
