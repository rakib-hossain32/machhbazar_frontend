export type FishProduct = {
  slug: string;
  name: string;
  species: string;
  seller: string;
  origin: string;
  price: number;
  previousPrice?: number;
  availableWeight: string;
  evidence: string;
  delivery: string;
  caughtAt: string;
  image: string;
  featured?: boolean;
};

export const fishImages = {
  market:
    "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=1800&q=88",
  river:
    "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1200&q=84",
  hilsa:
    "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=1200&q=84",
  rohu:
    "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=1200&q=84",
  prawn:
    "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=84",
  seaFish:
    "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1200&q=84",
  wholeFish:
    "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1200&q=84",
  catch:
    "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=1200&q=84",
  seller:
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=84",
  boats:
    "https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=1400&q=84",
  recipeOne:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=84",
  recipeTwo:
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=84",
  recipeThree:
    "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=84",
} as const;

export const categories = [
  { name: "River fish", count: 42, image: fishImages.hilsa, query: "river-fish" },
  { name: "Sea fish", count: 31, image: fishImages.seaFish, query: "sea-fish" },
  { name: "Prawn & crab", count: 18, image: fishImages.prawn, query: "prawn-crab" },
  { name: "Farm fresh", count: 27, image: fishImages.rohu, query: "farm-fresh" },
  { name: "Ready to cook", count: 23, image: fishImages.wholeFish, query: "ready-to-cook" },
] as const;

export const verifiedCatch: FishProduct[] = [
  {
    slug: "padma-hilsa-premium",
    name: "Padma Hilsa",
    species: "Tenualosa ilisha",
    seller: "Mawa River Collective",
    origin: "Mawa, Padma River",
    price: 1850,
    previousPrice: 1980,
    availableWeight: "14.8 kg",
    evidence: "Inspector verified",
    delivery: "Today, 4:00–6:00 PM",
    caughtAt: "Caught 4h ago",
    image: fishImages.hilsa,
    featured: true,
  },
  {
    slug: "jamuna-rohu",
    name: "Jamuna Rohu",
    species: "Labeo rohita",
    seller: "Sirajganj Freshwater",
    origin: "Jamuna River, Sirajganj",
    price: 520,
    availableWeight: "31.2 kg",
    evidence: "Source verified",
    delivery: "Today, 6:00–8:00 PM",
    caughtAt: "Caught 6h ago",
    image: fishImages.rohu,
  },
  {
    slug: "satkhira-tiger-prawn",
    name: "Tiger Prawn",
    species: "Penaeus monodon",
    seller: "Shyamnagar Aquatics",
    origin: "Shyamnagar, Satkhira",
    price: 1420,
    availableWeight: "9.6 kg",
    evidence: "Farm + weight verified",
    delivery: "Tomorrow, 9:00–11:00 AM",
    caughtAt: "Harvested 7h ago",
    image: fishImages.prawn,
  },
  {
    slug: "chattogram-sea-bass",
    name: "Wild Sea Bass",
    species: "Lates calcarifer",
    seller: "Patenga Coastal Catch",
    origin: "Bay of Bengal, Chattogram",
    price: 890,
    availableWeight: "18.4 kg",
    evidence: "Full passport",
    delivery: "Tomorrow, 11:00 AM–1:00 PM",
    caughtAt: "Landed 9h ago",
    image: fishImages.seaFish,
  },
];

export const popularFish: FishProduct[] = [
  verifiedCatch[1],
  verifiedCatch[2],
  {
    slug: "premium-katla",
    name: "Premium Katla",
    species: "Catla catla",
    seller: "Bhaluka Fishery Co.",
    origin: "Bhaluka, Mymensingh",
    price: 610,
    availableWeight: "26.5 kg",
    evidence: "Weight verified",
    delivery: "Today, 7:00–9:00 PM",
    caughtAt: "Harvested today",
    image: fishImages.wholeFish,
  },
  {
    slug: "coastal-coral",
    name: "Coastal Coral",
    species: "Lutjanus argentimaculatus",
    seller: "Patenga Coastal Catch",
    origin: "Kutubdia Channel",
    price: 980,
    availableWeight: "11.7 kg",
    evidence: "Inspector verified",
    delivery: "Tomorrow, 11:00 AM–1:00 PM",
    caughtAt: "Landed this morning",
    image: fishImages.catch,
  },
];

export const sellers = [
  {
    slug: "mawa-river-collective",
    name: "Mawa River Collective",
    location: "Munshiganj",
    rating: "4.9",
    orders: "1.8k orders",
    fulfillment: "98% on time",
    image: fishImages.seller,
  },
  {
    slug: "patenga-coastal-catch",
    name: "Patenga Coastal Catch",
    location: "Chattogram",
    rating: "4.8",
    orders: "1.2k orders",
    fulfillment: "96% on time",
    image: fishImages.boats,
  },
  {
    slug: "shyamnagar-aquatics",
    name: "Shyamnagar Aquatics",
    location: "Satkhira",
    rating: "4.9",
    orders: "864 orders",
    fulfillment: "99% on time",
    image: fishImages.prawn,
  },
] as const;

export const recipes = [
  {
    slug: "mustard-hilsa",
    title: "Mustard Hilsa, Weeknight Style",
    description: "A clean, sharp mustard sauce that keeps the fish at the center.",
    time: "35 min",
    difficulty: "Easy",
    image: fishImages.recipeOne,
    fish: "Padma Hilsa",
  },
  {
    slug: "tiger-prawn-coconut-curry",
    title: "Tiger Prawn Coconut Curry",
    description: "Silky coconut, green chilli, and prawns cooked just until tender.",
    time: "30 min",
    difficulty: "Easy",
    image: fishImages.recipeTwo,
    fish: "Tiger Prawn",
  },
  {
    slug: "charred-sea-bass",
    title: "Charred Sea Bass with Herbs",
    description: "Crisp skin, bright herbs, and a quick pan sauce for the table.",
    time: "45 min",
    difficulty: "Intermediate",
    image: fishImages.recipeThree,
    fish: "Wild Sea Bass",
  },
] as const;
