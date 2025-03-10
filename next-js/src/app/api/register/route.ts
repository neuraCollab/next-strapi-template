import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema/authjs-required-schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Проверяем, существует ли пользователь (через OAuth или уже зарегистрирован)
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUser.length > 0) {
      // Если пользователь есть, но у него нет пароля (OAuth), обновляем его запись
      if (!existingUser[0].password) {
        const hashedPassword = await hash(password, 10)
        await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email))

        return NextResponse.json({ message: "Password added. You can now log in." }, { status: 200 })
      }
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Если пользователя нет, создаем нового
    const hashedPassword = await hash(password, 10)

    await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      image: null,
      emailVerified: new Date(), // Заглушка для emailVerified (текущая дата),
      //   emailVerified: null,
    })

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
