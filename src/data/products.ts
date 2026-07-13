import serumImg from "@/assets/product-serum.jpg";
import creamImg from "@/assets/product-cream.jpg";
import moisturizerImg from "@/assets/product-moisturizer.jpg";
import cleanserImg from "@/assets/product-cleanser.jpg";
import sunscreenImg from "@/assets/product-sunscreen.jpg";

export type Category = "serums" | "face-creams" | "moisturizers" | "cleansers" | "sunscreens";
export type SkinType = "oily" | "dry" | "combination" | "sensitive" | "all";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number; // in DZD
  oldPrice?: number;
  image: string;
  gallery: string[];
  short: string;
  description: string;
  skinTypes: SkinType[];
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "serums", label: "Serums", blurb: "Concentrated actives, visible results." },
  { id: "face-creams", label: "Face Creams", blurb: "Rich textures for lasting comfort." },
  { id: "moisturizers", label: "Moisturizers", blurb: "Daily hydration, sealed in." },
  { id: "cleansers", label: "Cleansers", blurb: "Gentle purification, ritual clean." },
  { id: "sunscreens", label: "Sunscreens", blurb: "Broad-spectrum daily protection." },
];

const g = (main: string) => [main, main, main];

export const PRODUCTS: Product[] = [
  {
    id: "p1", slug: "golden-radiance-serum", name: "Golden Radiance Serum",
    category: "serums", price: 6500, oldPrice: 7900, image: serumImg, gallery: g(serumImg),
    short: "Vitamin C + Hyaluronic Acid brightening serum.",
    description: "A silky, fast-absorbing serum that visibly evens tone, boosts glow, and locks in deep hydration.",
    skinTypes: ["all", "dry", "combination"],
    ingredients: ["15% Vitamin C", "Hyaluronic Acid", "Niacinamide", "Squalane"],
    benefits: ["Brightens dull skin", "Fades dark spots", "Boosts hydration", "Smooths texture"],
    howToUse: "Apply 3–4 drops to clean skin morning and evening before moisturizer.",
    rating: 4.9, reviewsCount: 214, isBestSeller: true,
  },
  {
    id: "p2", slug: "rose-quartz-night-cream", name: "Rose Quartz Night Cream",
    category: "face-creams", price: 7200, image: creamImg, gallery: g(creamImg),
    short: "Restorative night cream with peptides & peony extract.",
    description: "A cushioning night ritual that renews skin overnight for a plump, luminous morning glow.",
    skinTypes: ["dry", "sensitive", "all"],
    ingredients: ["Peptide Complex", "Peony Extract", "Shea Butter", "Ceramides"],
    benefits: ["Deep overnight repair", "Plumps fine lines", "Soothes sensitivity"],
    howToUse: "Massage a pea-sized amount into skin nightly after serum.",
    rating: 4.8, reviewsCount: 156, isBestSeller: true,
  },
  {
    id: "p3", slug: "sage-dew-moisturizer", name: "Sage Dew Moisturizer",
    category: "moisturizers", price: 5400, image: moisturizerImg, gallery: g(moisturizerImg),
    short: "Weightless gel-cream for a fresh, dewy finish.",
    description: "A featherlight gel-cream that quenches without heaviness — ideal under makeup or sunscreen.",
    skinTypes: ["oily", "combination", "all"],
    ingredients: ["Green Tea", "Hyaluronic Acid", "Panthenol", "Aloe"],
    benefits: ["48h hydration", "Non-greasy finish", "Calms redness"],
    howToUse: "Smooth over face and neck morning and evening.",
    rating: 4.7, reviewsCount: 98, isNew: true,
  },
  {
    id: "p4", slug: "pearl-cleansing-milk", name: "Pearl Cleansing Milk",
    category: "cleansers", price: 4200, image: cleanserImg, gallery: g(cleanserImg),
    short: "Creamy milk cleanser that dissolves impurities.",
    description: "A silky cleansing milk that gently melts away makeup and daily buildup without stripping.",
    skinTypes: ["dry", "sensitive", "all"],
    ingredients: ["Oat Extract", "Almond Oil", "Glycerin", "Chamomile"],
    benefits: ["Non-stripping", "Removes makeup", "Soothes skin"],
    howToUse: "Massage onto damp skin, then rinse thoroughly with lukewarm water.",
    rating: 4.9, reviewsCount: 172,
  },
  {
    id: "p5", slug: "blush-shield-spf50", name: "Blush Shield SPF 50",
    category: "sunscreens", price: 5900, image: sunscreenImg, gallery: g(sunscreenImg),
    short: "Invisible daily UV shield with rose tint.",
    description: "A weightless mineral-hybrid sunscreen that blurs pores and gives skin a soft rose glow.",
    skinTypes: ["all", "combination", "sensitive"],
    ingredients: ["Zinc Oxide", "Vitamin E", "Rose Extract", "Niacinamide"],
    benefits: ["SPF 50 broad-spectrum", "No white cast", "Smoothing finish"],
    howToUse: "Apply generously as the last step of your morning routine.",
    rating: 4.8, reviewsCount: 260, isBestSeller: true, isNew: true,
  },
  {
    id: "p6", slug: "clarity-niacinamide-serum", name: "Clarity Niacinamide Serum",
    category: "serums", price: 4900, image: serumImg, gallery: g(serumImg),
    short: "Pore-refining serum for balanced, clear skin.",
    description: "A featherweight serum that visibly minimizes pores, controls shine, and balances oil.",
    skinTypes: ["oily", "combination"],
    ingredients: ["10% Niacinamide", "Zinc PCA", "Green Tea"],
    benefits: ["Refines pores", "Balances oil", "Evens tone"],
    howToUse: "Apply morning and evening on clean skin.",
    rating: 4.7, reviewsCount: 132,
  },
  {
    id: "p7", slug: "velvet-day-cream", name: "Velvet Day Cream",
    category: "face-creams", price: 6100, image: creamImg, gallery: g(creamImg),
    short: "Silken day cream with a soft-focus finish.",
    description: "A luxurious daytime cream infused with peptides and botanicals for radiant softness.",
    skinTypes: ["all", "dry"],
    ingredients: ["Peptides", "Squalane", "Botanical Extracts"],
    benefits: ["24h hydration", "Soft-focus finish", "Anti-fatigue"],
    howToUse: "Apply every morning after serum.",
    rating: 4.6, reviewsCount: 84, isNew: true,
  },
  {
    id: "p8", slug: "cloud-hydration-gel", name: "Cloud Hydration Gel",
    category: "moisturizers", price: 4800, image: moisturizerImg, gallery: g(moisturizerImg),
    short: "Cooling gel moisturizer for a plump, glassy look.",
    description: "An oil-free gel that floods skin with moisture and leaves a fresh, dewy veil.",
    skinTypes: ["oily", "combination", "all"],
    ingredients: ["Hyaluronic Acid 5D", "Cica", "Watermelon Extract"],
    benefits: ["Instant plumping", "Cooling comfort", "Oil-free"],
    howToUse: "Pat a small amount into skin morning and night.",
    rating: 4.8, reviewsCount: 121, isBestSeller: true,
  },
  {
    id: "p9", slug: "petal-foaming-cleanser", name: "Petal Foaming Cleanser",
    category: "cleansers", price: 3900, image: cleanserImg, gallery: g(cleanserImg),
    short: "Cushiony foam that leaves skin clean, not tight.",
    description: "A gentle sulfate-free foam that respects the skin barrier while lifting impurities.",
    skinTypes: ["combination", "oily", "all"],
    ingredients: ["Amino Acid Surfactants", "Rose Water", "Panthenol"],
    benefits: ["Balanced clean", "Non-drying", "Refreshing"],
    howToUse: "Massage onto damp skin, rinse, and pat dry.",
    rating: 4.7, reviewsCount: 89, isNew: true,
  },
  {
    id: "p10", slug: "mineral-glow-spf30", name: "Mineral Glow SPF 30",
    category: "sunscreens", price: 5100, image: sunscreenImg, gallery: g(sunscreenImg),
    short: "Everyday mineral sunscreen with a lit-from-within glow.",
    description: "A 100% mineral sunscreen that shields and illuminates for a healthy, luminous look.",
    skinTypes: ["all", "sensitive"],
    ingredients: ["Zinc Oxide", "Vitamin E", "Turmeric Extract"],
    benefits: ["Sensitive-skin safe", "Radiant finish", "Reef-friendly"],
    howToUse: "Apply as the final morning step. Reapply every 2 hours.",
    rating: 4.6, reviewsCount: 74,
  },
  {
    id: "p11", slug: "retinol-renewal-serum", name: "Retinol Renewal Serum",
    category: "serums", price: 7800, image: serumImg, gallery: g(serumImg),
    short: "Encapsulated retinol for smoother, firmer skin.",
    description: "A gentle-yet-effective retinol treatment that visibly refines texture and firms over time.",
    skinTypes: ["all", "combination"],
    ingredients: ["0.3% Encapsulated Retinol", "Bakuchiol", "Squalane"],
    benefits: ["Firms skin", "Smooths texture", "Refines pores"],
    howToUse: "Apply 2–3 drops at night, 2–3 times a week. Always use SPF in the day.",
    rating: 4.9, reviewsCount: 198, isBestSeller: true,
  },
  {
    id: "p12", slug: "calm-cream-sensitive", name: "Calm Cream Sensitive",
    category: "face-creams", price: 5800, image: creamImg, gallery: g(creamImg),
    short: "Barrier-repair cream for reactive skin.",
    description: "A soothing, fragrance-free cream that reinforces the skin barrier and calms redness.",
    skinTypes: ["sensitive", "dry"],
    ingredients: ["Centella Asiatica", "Ceramides", "Panthenol"],
    benefits: ["Calms redness", "Repairs barrier", "Fragrance-free"],
    howToUse: "Apply morning and night to clean skin.",
    rating: 4.9, reviewsCount: 143,
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const relatedProducts = (p: Product, n = 4) =>
  PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category).slice(0, n);
