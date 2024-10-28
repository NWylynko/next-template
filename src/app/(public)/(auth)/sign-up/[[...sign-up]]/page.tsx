import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <main className="grid place-items-center min-h-[70svh] mb-[10svh]">
      <SignUp />
    </main>
  );
}
