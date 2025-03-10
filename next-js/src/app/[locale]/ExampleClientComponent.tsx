"use client"

import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/elements/button"
import { ThemeToggle } from "@/components/ThemeToggle"

export function ExampleClientComponent() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Hang on there...</p>
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ThemeToggle />

        <Button className="mt-3" onClick={() => signIn("github")}>
          Sign in with GitHub
        </Button>
      </div>
    )
  }

  return (
    <div>
      ClientComponent {status}{" "}
      {status === "authenticated" && (
        <>
          {session?.user?.image && <Image src={session.user.image} alt="Avatar" width={100} height={100} priority />}

          <div>{session.user?.name}</div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </div>
  )
}
