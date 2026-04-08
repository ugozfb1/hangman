import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Crypto-themed Hangman game",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://hangman-weld-chi.vercel.app/og.svg",
      button: {
        title: "Play Hangman",
        action: {
          type: "launch_frame",
          name: "Hangman",
          url: "https://hangman-weld-chi.vercel.app",
          splashImageUrl: "https://hangman-weld-chi.vercel.app/icon.svg",
          splashBackgroundColor: "#0f172a",
        },
      },
    }),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}