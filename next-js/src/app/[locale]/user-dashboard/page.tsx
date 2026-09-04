import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { Container } from "@/components/container"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/subheading"
import { SignOutButton } from "@/components/dashboard/sign-out-button"

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await auth()

  if (!session?.user) {
    redirect(`/${locale}/auth/signin?callbackUrl=/${locale}/user-dashboard`)
  }

  const { user } = session
  const initials = (user.name || user.email || "?").slice(0, 2).toUpperCase()

  return (
    <Container className="mt-16 lg:mt-32 mb-32">
      <Heading as="h1" size="md">
        Личный кабинет
      </Heading>
      <Subheading>Добро пожаловать, {user.name || user.email}</Subheading>

      <div className="max-w-xl mx-auto mt-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-black">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-neutral-900 dark:text-white">{user.name || "Без имени"}</p>
            <p className="truncate text-sm text-neutral-500 dark:text-muted">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800 text-sm">
          <div className="flex items-center justify-between py-3">
            <dt className="text-neutral-500 dark:text-muted">Email</dt>
            <dd className="text-neutral-900 dark:text-white">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-neutral-500 dark:text-muted">Способ входа</dt>
            <dd className="text-neutral-900 dark:text-white">{user.isOAuth ? "OAuth" : "Email и пароль"}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <SignOutButton locale={locale} />
        </div>
      </div>
    </Container>
  )
}
