export function readFilters(params) {
  return {
    q: params.get("q") || "",
    city: params.get("city") || "",
    type: params.get("type") || "",
    status: params.get("status") || "",
    budget: params.get("budget") || "",
    beds: params.get("beds") || "",
    furnishing: params.get("furnishing") || "",
    sort: params.get("sort") || "recommended",
    page: Math.max(1, Number(params.get("page")) || 1),
  };
}
