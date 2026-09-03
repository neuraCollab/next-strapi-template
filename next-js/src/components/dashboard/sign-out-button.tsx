"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/elements/button"

export function SignOutButton({ locale }: { locale: string }) {
  return (
    <Button variant="muted" onClick={() => signOut({ callbackUrl: `/${locale}` })}>
      Sign out
    </Button>
  )
}
