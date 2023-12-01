import { getCookie } from "cookies-next";
import { Fira_Mono, Inter, Lora } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

import { ConvexProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const fira = Fira_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });
const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const font = getCookie("font", { cookies });

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          inter.className,
          font === "standard" && inter.className,
          font === "mono" && fira.className,
          font === "lora" && lora.className,
        )}
      >
        <ConvexProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
              storageKey="jotion-theme"
            >
              <Toaster
                position="top-center"
                theme="system"
              />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
