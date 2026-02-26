import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@repo/ui/styles.css";
import "./globals.css";
import { ContextProvider } from "@/context";

const geistSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Drawapp",
  description:
    "A realtime collaborative drawing application inspired by Excalidraw. Users can draw circles, rectangles, and freehand (pencil) strokes on a shared canvas and see updates instantly using WebSockets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
