import "@fontsource/hind-siliguri/300.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "./globals.css";

export const metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর — বাজারভিত্তিক সর্বনিম্ন, সর্বাধিক ও গড় দাম এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
