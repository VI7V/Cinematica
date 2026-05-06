import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Cinematica — Your Personal Cinema Vault",
  description: "Track movies and TV shows in style. A retro cinema dashboard for the modern viewer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#e5e5e5",
                border: "1px solid rgba(201, 168, 76, 0.3)",
                fontFamily: "system-ui",
              },
              success: {
                iconTheme: { primary: "#c9a84c", secondary: "#0a0a0a" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
