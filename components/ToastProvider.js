"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: { fontFamily: "'Hind Siliguri', sans-serif", borderRadius: "12px" },
        success: { iconTheme: { primary: "#1a9951", secondary: "#fff" } },
        error: { iconTheme: { primary: "#d03739", secondary: "#fff" } },
      }}
    />
  );
}
