import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bella Flower",
  description: "Нежный цветочный сайт Bella Flower."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
