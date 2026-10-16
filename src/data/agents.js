export const AGENTS = [
  {
    id: "ananya-sharma",
    name: "Ananya Sharma",
    role: "Principal Advisor, Mumbai",
    cities: ["Mumbai"],
    experience: 14,
    languages: ["English", "Hindi", "Marathi"],
    phone: "+91 98200 44118",
    email: "ananya.sharma@estates.in",
    focus: "Sea-facing residences, Pali Hill penthouses, and BKC commercial floors",
    tone: "forest",
    bio: "Ananya has spent fourteen years inside Mumbai's western corridor, from Worli Sea Face to Juhu's quieter gulmohar lanes. She is known for reading a building before the brochure does: lift banks, monsoon seepage, society mood, and which rooms actually catch the evening sun.",
  },
  {
    id: "rohan-mehta",
    name: "Rohan Mehta",
    role: "Advisor, New Delhi",
    cities: ["New Delhi"],
    experience: 11,
    languages: ["English", "Hindi", "Punjabi"],
    phone: "+91 98101 22845",
    email: "rohan.mehta@estates.in",
    focus: "Independent bungalows and park-facing apartments in South Delhi",
    tone: "ink",
    bio: "Rohan works with families who want a South Delhi address without the theatre. Vasant Vihar plots, Golf Links drawing rooms, and Greater Kailash rentals are his daily round. He is particular about service lanes, ceiling heights, and papers that survive a lawyer's second reading.",
  },
  {
    id: "priya-iyer",
    name: "Priya Iyer",
    role: "Advisor, Bengaluru",
    cities: ["Bengaluru"],
    experience: 9,
    languages: ["English", "Kannada", "Tamil", "Hindi"],
    phone: "+91 98450 77310",
    email: "priya.iyer@estates.in",
    focus: "Indiranagar villas and considered apartments in Whitefield",
    tone: "moss",
    bio: "Priya helps founders and returning families settle in Bengaluru without defaulting to a glass tower. She looks for cross-ventilation, a real pooja, and streets that still have trees. Her notes on Indiranagar traffic at 6 pm have saved more than one client.",
  },
  {
    id: "vikram-reddy",
    name: "Vikram Reddy",
    role: "Advisor, Hyderabad",
    cities: ["Hyderabad"],
    experience: 12,
    languages: ["English", "Telugu", "Hindi"],
    phone: "+91 90000 66214",
    email: "vikram.reddy@estates.in",
    focus: "Jubilee Hills villas and Banjara Hills family apartments",
    tone: "gold",
    bio: "Vikram covers the ridges above Hyderabad, where a view and a wide plot still matter. He is fluent in the difference between a filmed lawn and a garden you can use, and he treats Vastu as a practical conversation rather than a slogan.",
  },
  {
    id: "meera-krishnan",
    name: "Meera Krishnan",
    role: "Advisor, Chennai",
    cities: ["Chennai"],
    experience: 10,
    languages: ["English", "Tamil", "Malayalam"],
    phone: "+91 98400 91552",
    email: "meera.krishnan@estates.in",
    focus: "Boat Club houses and comfortable Adyar apartments",
    tone: "forest",
    bio: "Meera specialises in Chennai homes that respect the weather. Deep verandahs, generator capacity, and a kitchen laid out for a festival matter as much as the postcode. Boat Club and Adyar are where she spends most of her week.",
  },
  {
    id: "kabir-malhotra",
    name: "Kabir Malhotra",
    role: "Advisor, leisure and city homes",
    cities: ["Pune", "Kolkata", "Jaipur", "Goa", "Ahmedabad"],
    experience: 8,
    languages: ["English", "Hindi", "Marathi", "Bengali"],
    phone: "+91 98230 11876",
    email: "kabir.malhotra@estates.in",
    focus: "Koregaon Park, Alipore, C-Scheme, Candolim, and Prahlad Nagar",
    tone: "ink",
    bio: "Kabir looks after clients who keep a city home and a slower one. A Koregaon Park bungalow, an Alipore apartment, a Jaipur courtyard, a Candolim villa, or a bright flat in Ahmedabad: he visits them himself and will talk you out of a house that only works in photographs.",
  },
];

export const DESK = {
  id: "estates-desk",
  name: "Estates.in Desk",
  role: "New listing desk",
  cities: ["India"],
  experience: 6,
  languages: ["English", "Hindi"],
  phone: "+91 22 4890 2100",
  email: "hello@estates.in",
  focus: "Homes submitted directly on Estates.in",
  tone: "moss",
  bio: "The desk reviews new submissions, matches them with a city advisor, and helps owners prepare a private viewing.",
};

export function findAgent(id) {
  return AGENTS.find((agent) => agent.id === id) || (id === DESK.id ? DESK : null);
}

export function agentForCity(city) {
  return AGENTS.find((agent) => agent.cities.includes(city)) || DESK;
}

export const TONES = {
  forest: "bg-forest text-ivory",
  ink: "bg-ink text-ivory",
  moss: "bg-moss text-ivory",
  gold: "bg-gold text-ink",
};
