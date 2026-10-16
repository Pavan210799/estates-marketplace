export const AMENITIES = [
  "Private pool",
  "Infinity pool",
  "Clubhouse",
  "Gymnasium",
  "Concierge",
  "24×7 security",
  "Covered parking",
  "Visitor parking",
  "Power backup",
  "Central air conditioning",
  "Modular kitchen",
  "Italian marble",
  "Smart home",
  "Home theatre",
  "Private lift",
  "Pooja room",
  "Study",
  "Servant quarter",
  "Vastu compliant",
  "EV charging",
  "Landscaped garden",
  "Rainwater harvesting",
  "Kids' play area",
  "Spa",
  "Wine cellar",
  "Rooftop deck",
  "Video door phone",
  "Earthquake-resistant structure",
];

export const PROPERTY_TYPES = [
  "Apartment",
  "Penthouse",
  "Villa",
  "Independent House",
  "Commercial",
];

export const FURNISHING = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

export const SALE_BUDGETS = [
  { id: "under-1cr", label: "Under ₹1 Cr", min: 0, max: 10000000 },
  { id: "1-3cr", label: "₹1 Cr – ₹3 Cr", min: 10000000, max: 30000000 },
  { id: "3-8cr", label: "₹3 Cr – ₹8 Cr", min: 30000000, max: 80000000 },
  { id: "8-20cr", label: "₹8 Cr – ₹20 Cr", min: 80000000, max: 200000000 },
  { id: "20cr-plus", label: "₹20 Cr and above", min: 200000000, max: Infinity },
];

export const RENT_BUDGETS = [
  { id: "under-1l", label: "Under ₹1 Lakh / month", min: 0, max: 100000 },
  { id: "1-3l", label: "₹1 Lakh – ₹3 Lakh", min: 100000, max: 300000 },
  { id: "3l-plus", label: "₹3 Lakh and above", min: 300000, max: Infinity },
];

export const BED_OPTIONS = [
  { id: "1", label: "1 BHK" },
  { id: "2", label: "2 BHK" },
  { id: "3", label: "3 BHK" },
  { id: "4", label: "4 BHK" },
  { id: "5", label: "5 BHK and above" },
];

export const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest listings" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "area-desc", label: "Largest area" },
];

export const CITY_GUIDES = [
  { city: "Mumbai", line: "Worli, Bandra, Juhu, and BKC" },
  { city: "New Delhi", line: "Vasant Vihar, Golf Links, Greater Kailash" },
  { city: "Bengaluru", line: "Indiranagar and Whitefield" },
  { city: "Hyderabad", line: "Jubilee Hills and Banjara Hills" },
  { city: "Chennai", line: "Boat Club and Adyar" },
  { city: "Pune", line: "Koregaon Park and Baner" },
  { city: "Kolkata", line: "Alipore park-side residences" },
  { city: "Jaipur", line: "C-Scheme courtyard houses" },
  { city: "Goa", line: "Candolim holiday villas" },
  { city: "Ahmedabad", line: "Prahlad Nagar apartments" },
];

export const CITY_ORDER = CITY_GUIDES.map((guide) => guide.city);

export const FORM_CITIES = [
  ...CITY_ORDER,
  "Gurugram",
  "Noida",
  "Kochi",
  "Chandigarh",
  "Lucknow",
  "Indore",
  "Surat",
  "Nagpur",
  "Coimbatore",
  "Visakhapatnam",
  "Other",
];

export const FORM_STATES = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Telangana",
  "Tamil Nadu",
  "West Bengal",
  "Rajasthan",
  "Goa",
  "Gujarat",
  "Haryana",
  "Uttar Pradesh",
  "Kerala",
  "Punjab",
  "Chandigarh",
  "Madhya Pradesh",
  "Andhra Pradesh",
];

export const CITY_STATE = {
  Mumbai: "Maharashtra",
  "New Delhi": "Delhi",
  Bengaluru: "Karnataka",
  Hyderabad: "Telangana",
  Chennai: "Tamil Nadu",
  Pune: "Maharashtra",
  Kolkata: "West Bengal",
  Jaipur: "Rajasthan",
  Goa: "Goa",
  Ahmedabad: "Gujarat",
  Gurugram: "Haryana",
  Noida: "Uttar Pradesh",
  Kochi: "Kerala",
  Chandigarh: "Chandigarh",
  Lucknow: "Uttar Pradesh",
  Indore: "Madhya Pradesh",
  Surat: "Gujarat",
  Nagpur: "Maharashtra",
  Coimbatore: "Tamil Nadu",
  Visakhapatnam: "Andhra Pradesh",
};

export const NEIGHBOURHOODS = [
  "Worli",
  "Bandra West",
  "Juhu",
  "Bandra Kurla Complex",
  "Vasant Vihar",
  "Golf Links",
  "Greater Kailash",
  "Indiranagar",
  "Whitefield",
  "Jubilee Hills",
  "Banjara Hills",
  "Boat Club",
  "Adyar",
  "Koregaon Park",
  "Alipore",
  "C-Scheme",
  "Candolim",
  "Prahlad Nagar",
];

export const TESTIMONIALS = [
  {
    quote:
      "We wanted a Juhu house that still felt like a family home. Ananya shortlisted three and already knew which society would welcome our dog.",
    name: "Neelam Kulkarni",
    place: "Juhu, Mumbai",
  },
  {
    quote:
      "The Golf Links apartment was quiet, well documented, and fairly priced. Rohan walked us through the society papers before we ever made an offer.",
    name: "Raghav Bansal",
    place: "Golf Links, New Delhi",
  },
  {
    quote:
      "Priya understood that we needed a study, a pooja room, and a short drive to Indiranagar. The courtyard villa was the first home that met all three.",
    name: "Aditi Menon",
    place: "Indiranagar, Bengaluru",
  },
  {
    quote:
      "Candolim had plenty of glossy villas. Kabir took us to the one with a real kitchen, a proper staff room, and a pool that is usable in May.",
    name: "Farhan Qureshi",
    place: "Candolim, Goa",
  },
];

export const STEPS = [
  {
    number: "01",
    title: "Share the brief",
    copy: "City, budget, and the way you want to live. A sea-facing study, a Vastu east entrance, or a house for three generations.",
  },
  {
    number: "02",
    title: "Tour a short list",
    copy: "We keep the first round small. Private viewings, society rules, parking, and what the photographs leave out.",
  },
  {
    number: "03",
    title: "Close with care",
    copy: "Your advisor stays through token, agreement, and handover. No handover to a call centre once the home is chosen.",
  },
];

export function budgetOptions(status) {
  if (status === "For Sale") return SALE_BUDGETS;
  if (status === "For Rent") return RENT_BUDGETS;
  return [];
}

export function matchesBudget(price, status, budgetId) {
  if (!budgetId) return true;
  const bucket = budgetOptions(status).find((item) => item.id === budgetId);
  if (!bucket) return true;
  return price >= bucket.min && price < bucket.max;
}

export function orderedCities(properties) {
  const present = new Set(properties.map((property) => property.city));
  const known = CITY_ORDER.filter((city) => present.has(city));
  const extra = [...present].filter((city) => !CITY_ORDER.includes(city)).sort();
  return [...known, ...extra];
}
