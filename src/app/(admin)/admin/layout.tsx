import { getUser } from "@/services/clerk";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AdminSiteLayout(props: PropsWithChildren) {
  const account = await getUser();

  if (!account) {
    notFound();
  }

  if (account.metadata.isAdmin !== true) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {props.children}
    </div>
  );
}

function Header() {
  return (
    <header className="flex min-h-20 items-center justify-between border-b bg-gray-100/40 p-4 px-8">
      <Link href="/admin">
        <h1>Admin Portal</h1>
      </Link>
      <UserButton />
    </header>
  );
}
