import { matchesBudget } from "../data/content";

export const PAGE_SIZE = 6;

export function filterProperties(properties, query) {
  const keyword = (query.q || "").trim().toLowerCase();

  return properties.filter((property) => {
    if (keyword) {
      const haystack = [
        property.title,
        property.project,
        property.city,
        property.locality,
        property.type,
        property.state,
        property.address,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    if (query.city && property.city !== query.city) return false;
    if (query.type && property.type !== query.type) return false;
    if (query.status && property.status !== query.status) return false;
    if (query.furnishing && property.furnishing !== query.furnishing) return false;
    if (query.beds) {
      if (query.beds === "5") {
        if (property.bedrooms < 5) return false;
      } else if (property.bedrooms !== Number(query.beds)) return false;
    }
    if (query.budget && query.status) {
      if (!matchesBudget(property.price, query.status, query.budget)) return false;
    }
    return true;
  });
}

export function sortProperties(properties, sort) {
  const list = [...properties];
  if (sort === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return list.sort((a, b) => b.price - a.price);
  if (sort === "area-desc") return list.sort((a, b) => b.area - a.area);
  if (sort === "newest") return list.sort((a, b) => b.listedOn.localeCompare(a.listedOn));
  return list.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.listedOn.localeCompare(a.listedOn);
  });
}
