// Data layer for the Bazar Dor API.
// Three sources are tried in order — the first one that returns valid data is used.

const API_BASES = [
  process.env.NEXT_PUBLIC_API_BASE_URL, // optional override from Vercel settings
  "https://openapi.programming-hero.com/api/bazardor", // recommended by Programming Hero
  "https://api.api-store.workers.dev/api/bazardor", // BASE_URL_1
  "https://api.abcz.workers.dev/api/bazardor", // BASE_URL_2 (alternative)
].filter(Boolean);

// Cache API responses for 5 minutes (prices change daily, not every second).
const REVALIDATE_SECONDS = 300;

// Give up on a slow source and move to the next one.
const TIMEOUT_MS = 6000;

/** Accept a plain array, or an array wrapped as { data: [...] } just in case an API changes. */
function toArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return null;
}

/**
 * Fetch a list endpoint from the first source that returns a non-empty, valid array.
 * Only list endpoints are used (/products, /categories) — single items and category filters
 * are worked out locally, so every source behaves the same.
 */
async function fetchList(path, isValidItem) {
  let lastError;

  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${base}${path}`);

      const list = toArray(await res.json());
      if (!list || list.length === 0 || !isValidItem(list[0])) {
        throw new Error(`Unexpected data from ${base}${path}`);
      }
      return list;
    } catch (error) {
      lastError = error;
      console.error(`[api] ${base}${path} failed — trying next source:`, error?.message);
    }
  }

  throw lastError ?? new Error(`All API sources failed for ${path}`);
}

const isProduct = (item) => Boolean(item?.slug && item?.nameBn && item?.today != null);
const isCategory = (item) => Boolean(item?.slug && item?.nameBn);

/** All products */
export async function getProducts() {
  return fetchList("/products", isProduct);
}

/** Products of a single category, e.g. "chal" (filtered locally — not every API supports ?category=) */
export async function getProductsByCategory(slug) {
  const products = await getProducts();
  return products.filter((product) => product.category === slug);
}

/** A single product by its slug */
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

/** All categories */
export async function getCategories() {
  return fetchList("/categories", isCategory);
}

/** A single category, or null for an invalid slug */
export async function getCategory(slug) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

/** Top risers (price went up) sorted by biggest % change */
export function getTopRisers(products, limit = 6) {
  return products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

/** Top fallers (price went down) sorted by biggest % drop */
export function getTopFallers(products, limit = 6) {
  return products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

/** Min / max / average price across all markets of a product */
export function getPriceSummary(product) {
  const markets = (product.markets ?? []).map((market) => ({
    ...market,
    avg: (market.min + market.max) / 2,
  }));

  if (markets.length === 0) {
    return { markets, min: null, max: null, avg: product.today, cheapest: null, costliest: null };
  }

  const cheapest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const costliest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const avg = markets.reduce((sum, market) => sum + market.avg, 0) / markets.length;

  return { markets, min: cheapest.min, max: costliest.max, avg, cheapest, costliest };
}
