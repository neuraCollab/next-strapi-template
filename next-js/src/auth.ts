import NextAuth, { type NextAuthConfig } from "next-auth"
import GitHub from "@auth/core/providers/github"
import YandexProvider from "next-auth/providers/yandex"
import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { users, twoFactorConfirmations, accounts } from "@/db/schema/authjs-required-schema"

export const config: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    GitHub,
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        const existingUser = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            password: users.password,
            emailVerified: users.emailVerified,
            isTwoFactorEnabled: users.isTwoFactorEnabled, // ✅ Добавляем поле двухфакторной аутентификации
          })
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1)

        if (!existingUser.length) {
          throw new Error("User not found")
        }

        const user = existingUser[0]

        if (!user.password) {
          throw new Error("This account was created using OAuth. Please log in with GitHub or Yandex.")
        }

        const isValidPassword = await compare(credentials.password as string, user.password)
        if (!isValidPassword) {
          throw new Error("Invalid password")
        }

        // Проверяем двухфакторную аутентификацию
        if (user.isTwoFactorEnabled) {
          const twoFactorConfirmation = await db
            .select()
            .from(twoFactorConfirmations)
            .where(eq(twoFactorConfirmations.userId, user.id))
            .limit(1)

          if (!twoFactorConfirmation.length) {
            throw new Error("Two-factor authentication required")
          }

          // Удаляем подтверждение 2FA после успешного входа
          await db.delete(twoFactorConfirmations).where(eq(twoFactorConfirmations.userId, user.id))
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified || null,
        }
      },
    }),
  ],

  adapter: DrizzleAdapter(db),

  session: { strategy: "jwt" },

  events: {
    async linkAccount({ user }) {
      await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, user.id))
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await db.select({ emailVerified: users.emailVerified }).from(users).where(eq(users.id, user.id)).limit(1)

      if (!existingUser.length || !existingUser[0].emailVerified) {
        return false
      }

      return true
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as string
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          isTwoFactorEnabled: users.isTwoFactorEnabled,
        })
        .from(users)
        .where(eq(users.id, token.sub))
        .limit(1)

      if (!existingUser.length) return token

      const existingAccount = await db.select().from(accounts).where(eq(accounts.userId, existingUser[0].id)).limit(1)

      token.isOAuth = !!existingAccount.length
      token.name = existingUser[0].name
      token.email = existingUser[0].email
      token.role = existingUser[0].role
      token.isTwoFactorEnabled = existingUser[0].isTwoFactorEnabled

      return token
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
