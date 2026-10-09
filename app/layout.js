import "@fontsource/hind-siliguri/300.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import ToastProvider from "@/components/ToastProvider";
import { getCategories, getProducts } from "@/lib/api";
import { getSession } from "@/lib/session";

export const metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর — বাজারভিত্তিক সর্বনিম্ন, সর্বাধিক ও গড় দাম এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default async function RootLayout({ children }) {
  // The navbar and ticker should never break the page if the API is slow or down.
  const [categories, products, session] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
    getSession(),
  ]);

  return (
    <html lang="bn" data-theme="bazardor">
      <body className="min-h-screen flex flex-col">
        <Navbar categories={categories} user={session?.user ?? null} />
        <PriceTicker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
