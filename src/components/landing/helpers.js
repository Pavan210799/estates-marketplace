export function coverFor(city, properties) {
  const match =
    properties.find((property) => property.city === city && property.featured) ||
    properties.find((property) => property.city === city);
  return match?.images?.[0];
}
