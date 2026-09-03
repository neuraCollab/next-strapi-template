"use client"

import { useSession, signOut } from "next-auth/react"
import { Link } from "next-view-transitions"
import { Button } from "@/components/elements/button"
import { ThemeToggle } from "@/components/ThemeToggle"

export function NavAuthControls({ locale }: { locale: string }) {
  const { data: session, status } = useSession()

  return (
    <div className="flex items-center gap-1.5">
      <ThemeToggle />

      {status === "authenticated" ? (
        <>
          <Button variant="simple" as={Link} href={`/${locale}/user-dashboard`}>
            {session.user?.name || "Dashboard"}
          </Button>
          <Button variant="muted" onClick={() => signOut({ callbackUrl: `/${locale}` })}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Button variant="simple" as={Link} href={`/${locale}/auth/signin`}>
            Log in
          </Button>
          <Button variant="primary" as={Link} href={`/${locale}/auth/register`}>
            Register
          </Button>
        </>
      )}
    </div>
  )
}
