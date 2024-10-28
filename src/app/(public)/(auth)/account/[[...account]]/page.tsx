import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <main className="grid place-items-center min-h-[70svh] mb-[10svh]">
      <UserProfile path="/account" routing="path" />
    </main>
  );
}
