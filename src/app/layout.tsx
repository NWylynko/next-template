import "@/app/_styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
import { inter } from "./_styles/fonts";

export const metadata: Metadata = {
  title: "Next Template",
  description: "",
  icons: [{ rel: "icon", type: "image/png", url: "/icon.png" }],
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`bg-background min-h-[100svh] font-inter antialiased ${inter.variable}`}>
          <ClerkProvider
            signUpFallbackRedirectUrl="/home"
            afterSignOutUrl="/"
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
          >
            {props.children}
          </ClerkProvider>
          <Toaster />
      </body>
    </html>
  );
}