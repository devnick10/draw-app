"use client";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Navbar } from "@/components/ui/navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position={"top-center"} />
      <Navbar />
      <main>
        <AuthGuard>{children}</AuthGuard>
      </main>
    </>
  );
}
