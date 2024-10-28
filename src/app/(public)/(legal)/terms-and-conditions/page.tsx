import { MarkdownDisplay } from "@/app/_components/MarkdownDisplay";
import { md } from "./terms-and-conditions.md";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="p-2 max-w-[60ch] mx-auto">
      <MarkdownDisplay text={md} />
    </main>
  );
}
