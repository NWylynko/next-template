import { MarkdownDisplay } from "@/app/_components/MarkdownDisplay";
import { md } from "./privacy-policies.md";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="p-2 max-w-[60ch] mx-auto">
      <MarkdownDisplay text={md} />
    </main>
  );
}
