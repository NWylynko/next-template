import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Example Site",
  alternates: {
    canonical: "https://example.com/",
  },
};

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      Hello World
    </main>
  );
}
