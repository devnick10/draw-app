import { AuthGuard } from "@/components/auth/auth-guard";
import { Navbar } from "@/components/ui/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>
        <AuthGuard>{children}</AuthGuard>
      </main>
    </>
  );
}
