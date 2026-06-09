import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GemaMat",
  description:
    "Interactive visualization of ALD and CVD thin film deposition data extracted from research papers",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
