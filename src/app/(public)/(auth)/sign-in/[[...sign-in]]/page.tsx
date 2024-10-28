import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <main className="grid place-items-center min-h-[70svh] mb-[10svh]">
      <SignIn />
    </main>
  );
}
