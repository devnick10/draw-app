import { ContextProvider } from "@/context";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter, Poppins,Marck_Script } from "next/font/google";
import "./globals.css";

const markScript = Marck_Script({
  variable: "--font-marck",
  subsets: ["latin"],
  weight:  ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
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
        className={`${poppins.variable} ${inter.variable} ${markScript.variable} antialiased`}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
