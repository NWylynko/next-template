"use client"

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center max-w-5xl mx-auto p-6">
      <Link href="/">
        <h1 className="text-xl">Home</h1>
      </Link>

      <AuthNav />
    </header>
  )
}

function AuthNav() {
  const { isSignedIn, isLoaded } = useUser()

  if (isLoaded === false) {
    return (
      <div className="flex gap-2">
        <Button disabled variant="outline">Sign In</Button>
        <Button disabled>Get Started</Button>
      </div>
    )
  }

  if (isSignedIn) {
    return <UserButton />
  }

  return (
    <div className="flex gap-2">
      <SignInButton>
        <Button variant="outline">Sign In</Button>
      </SignInButton>
      <SignUpButton fallbackRedirectUrl="/get-started">
        <Button>Get Started</Button>
      </SignUpButton>
    </div>
  )
}