import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Design Agency | وكالة تصميم المواقع",
  description: "Professional websites for your business | مواقع احترافية لعملك",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
