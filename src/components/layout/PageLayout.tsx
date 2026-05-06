import { Navbar } from "./Navbar";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cinema-black">
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
}
