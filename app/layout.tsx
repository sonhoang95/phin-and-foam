import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const displayFont = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces-Regular.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Fraunces-Italic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia"],
});

const bodyFont = localFont({
  src: "../public/fonts/DMSans-Regular.ttf",
  weight: "100 1000",
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial"],
});

export const metadata: Metadata = {
  title: "Phin & Foam | Vietnamese Coffee",
  description:
    "Vietnamese roots. Austin soul. Meet your daily coffee ritual with Phin & Foam House Blend and a traditional phin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
