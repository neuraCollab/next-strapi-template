import { timestamp, pgTable, text, primaryKey, integer, boolean } from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"

// 🔹 Таблица пользователей
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: text("role").default("USER"), // 👤 Добавлено поле роли
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false), // 🔐 2FA-флаг
})

// 🔹 Аккаунты OAuth
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

// 🔹 Сессии
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

// 🔹 Токены верификации (для сброса пароля и подтверждения email)
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

// 🔹 Двухфакторная аутентификация (2FA)
export const twoFactorConfirmations = pgTable("twoFactorConfirmation", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
})

// 🔹 Логирование действий пользователей
export const auditLogs = pgTable("auditLog", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).defaultNow(),
})
