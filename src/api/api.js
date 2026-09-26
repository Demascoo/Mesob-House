import menuJson from "../data/menu.json";
import specialsJson from "../data/specials.json";

const allDishes = menuJson.data;
const specialDishes = specialsJson.data;

export function loadDishes(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(allDishes), 200);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}

export function loadSpecials(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(specialDishes), 200);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}

export function loadDish(slug, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const dish = allDishes.find((d) => d.slug === slug);
      if (!dish) reject(new Error(`No dish "${slug}".`));
      else resolve(dish);
    }, 200);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}
