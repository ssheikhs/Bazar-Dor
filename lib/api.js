// Data layer for the Bazar Dor API.
// BASE_URL_1 is the primary API, BASE_URL_2 is used automatically as a fallback.

const API_BASES = [
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// Cache API responses for 5 minutes (prices change daily, not every second).
const REVALIDATE_SECONDS = 300;

/**
 * Fetch JSON from the API, trying each base URL in order.
 * Returns `null` when the resource does not exist (404).
 */
async function fetchFromApi(path) {
  let lastError;

  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`API ${res.status} for ${path}`);

      return await res.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error(`Failed to load ${path}`);
}

/** All products */
export async function getProducts() {
  const data = await fetchFromApi("/products");
  return Array.isArray(data) ? data : [];
}

/** Products of a single category, e.g. "chal" */
export async function getProductsByCategory(slug) {
  const data = await fetchFromApi(`/products?category=${encodeURIComponent(slug)}`);
  return Array.isArray(data) ? data : [];
}

/** A single product by its slug (the API only supports lookup by id, so we search the list). */
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

/** All categories */
export async function getCategories() {
  const data = await fetchFromApi("/categories");
  return Array.isArray(data) ? data : [];
}

/** A single category, or null for an invalid slug */
export async function getCategory(slug) {
  try {
    const data = await fetchFromApi(`/categories/${encodeURIComponent(slug)}`);
    return data && data.slug ? data : null;
  } catch {
    // Unknown slugs can come back as errors — treat them as "not found".
    const categories = await getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  }
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
