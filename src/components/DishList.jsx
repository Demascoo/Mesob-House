import PropTypes from "prop-types";
import DishCard from "./DishCard";

export default function DishList({ dishes }) {
  if (!dishes?.length) {
    return <p className="spinner">No dishes yet.</p>;
  }
  return (
    <div className="dish-list">
      {dishes.map((d) => (
        <DishCard key={d.id} dish={d} />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array,
};
