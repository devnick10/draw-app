"use client";
import { Navbar } from "@/components/ui/navbar";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster position={"top-center"} />
    </>
  );
}
