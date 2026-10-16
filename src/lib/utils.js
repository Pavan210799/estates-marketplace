export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function compactAmount(amount) {
  const [value, unit] =
    amount >= 10000000 ? [amount / 10000000, "Cr"] : [amount / 100000, "Lakh"];
  const digits = Number.isInteger(value) ? 0 : value >= 10 ? 1 : 2;
  const text = value
    .toFixed(digits)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
  return `₹${text} ${unit}`;
}

export function formatINR(amount) {
  const value = Number(amount) || 0;
  if (value >= 100000) return compactAmount(value);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatExactINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export function formatPrice(property) {
  const label = formatINR(property.price);
  return property.status === "For Rent" ? `${label} / month` : label;
}

export function formatArea(area) {
  return `${Number(area).toLocaleString("en-IN")} sq.ft`;
}

export function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function bedroomLabel(property) {
  if (property.type === "Commercial" || property.bedrooms === 0) return "Office";
  return `${property.bedrooms} BHK`;
}

export function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isIndianMobile(value) {
  const digits = value.replace(/[^\d]/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local);
}
