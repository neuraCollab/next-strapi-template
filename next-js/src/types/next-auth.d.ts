import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role?: string | null
      isOAuth?: boolean
      isTwoFactorEnabled?: boolean
    } & DefaultSession["user"]
  }
}
