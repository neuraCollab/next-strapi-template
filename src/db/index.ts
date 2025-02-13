import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "@/db/schema/authjs-required-schema"

declare global {
  var db: ReturnType<typeof drizzle> | undefined
}

// Настройки подключения к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Создаём экземпляр Drizzle ORM
export const db = globalThis.db || drizzle(pool, { schema })

if (process.env.NODE_ENV !== "production") globalThis.db = db
