# 🛒 বাজার দর — BazarDor

**আজকের বাজারের দাম এক নজরে।**

BazarDor is a Bangla price-tracking website for Bangladesh's daily essentials. It covers rice, lentils, oil, vegetables, fish, meat, eggs and milk, and spices. For each item you can see today's price, how much it rose or fell since yesterday, and the lowest, highest and average price across markets in every division of the country.

🔗 **Live site:** https://bazar-dor-six-xi.vercel.app
📦 **Repository:** https://github.com/ssheikhs/Bazar-Dor

---

## ✨ Features

1. **Live price board.** The home page shows the 6 biggest price rises (▲) and falls (▼) of the day, plus a responsive grid of all products. Prices, percentages and dates are shown in Bangla digits.
2. **Scrolling price ticker.** A strip under the navbar scrolls endlessly with every product's price and change.
3. **Category pages with sorting.** `/category/[slug]` lists one category with a **সাজান** dropdown: default, price low to high, or price high to low. Sorting uses the real numbers, not the Bangla text.
4. **Market-wise product details (login required).** `/product/[slug]` shows the lowest, highest and average price, price history (yesterday, last week, last month) and a table of 12 markets across 6 divisions.
5. **Authentication with BetterAuth.** Email/password sign up and sign in, Google and GitHub login, a protected route that returns you to the product after login, and toast notifications for every auth action.
6. **My Profile and profile update.** View your account at `/profile` and change your name at `/profile/update` using BetterAuth's `updateUser`.
7. **Polished UX.** Skeleton loaders, a friendly Bangla 404 page with a “হোম পেজে ফিরে যান” button, and an error page with retry. The layout works on mobile, tablet and desktop.

## 🛠️ Technologies

| Purpose | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, Server Components) |
| UI | React 19, JavaScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [daisyUI 5](https://daisyui.com) |
| Authentication | [BetterAuth](https://better-auth.com) (email/password, Google, GitHub) |
| Database | MongoDB Atlas (`@better-auth/mongo-adapter`) |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |
| Font | Hind Siliguri (`@fontsource/hind-siliguri`) |
| Hosting | Vercel |

## 📡 API

Data comes from the Bazar Dor API. If the primary URL fails, the app falls back to the second one automatically.

- `https://api.api-store.workers.dev/api/bazardor` (primary)
- `https://api.abcz.workers.dev/api/bazardor` (fallback)

Endpoints used: `/products`, `/products?category=:slug`, `/categories`, `/categories/:slug`

## 🗂️ Project structure

```
app/
  page.js                 # Home — hero, risers, fallers, all products
  category/[slug]/        # Category page + loading skeleton
  product/[slug]/         # Protected product details + loading skeleton
  signin/ signup/         # Auth pages
  profile/ profile/update # My Profile + update name
  api/auth/[...all]/      # BetterAuth route handler
  not-found.js error.js loading.js
components/               # Navbar, PriceTicker, ProductCard, forms, skeletons…
lib/
  api.js                  # API fetch with fallback + price helpers
  bn.js                   # Bangla digits, prices, units and dates
  auth.js auth-client.js  # BetterAuth server & client
```

## 🚀 Run locally

```bash
git clone https://github.com/ssheikhs/Bazar-Dor.git
cd Bazar-Dor
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

### Environment variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB` | Database name (default `bazardor`) |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Site URL, e.g. `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app credentials |

OAuth callback URLs: `<BETTER_AUTH_URL>/api/auth/callback/google` and `<BETTER_AUTH_URL>/api/auth/callback/github`

---

> সকল দাম সম্ভাব্য বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
