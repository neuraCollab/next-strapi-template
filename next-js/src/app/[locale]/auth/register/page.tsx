"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      await signIn("credentials", { email: form.email, password: form.password, redirect: false })
      router.push(callbackUrl)
    } else {
      const data = await res.json().catch(() => null)
      setError(data?.error || "Something went wrong")
    }
  }

  return (
    <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center rounded-xl overflow-hidden border border-neutral-800">
        <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-neutral-900 to-neutral-800 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg">Create Your Account</h4>
            <p className="text-[13px] text-neutral-400 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg">Simple & Secure Registration</h4>
            <p className="text-[13px] text-neutral-400 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and secure.
            </p>
          </div>
        </div>

        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto bg-neutral-950" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-white text-xl font-bold">Create an account</h3>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="space-y-6">
            <div>
              <label className="text-neutral-400 text-sm mb-2 block">Name</label>
              <input
                name="name"
                type="text"
                required
                className="text-white bg-neutral-900 border border-neutral-700 w-full text-sm pl-4 py-2.5 rounded-md outline-none focus:border-secondary"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-neutral-400 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                required
                className="text-white bg-neutral-900 border border-neutral-700 w-full text-sm pl-4 py-2.5 rounded-md outline-none focus:border-secondary"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-neutral-400 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                required
                className="text-white bg-neutral-900 border border-neutral-700 w-full text-sm pl-4 py-2.5 rounded-md outline-none focus:border-secondary"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-secondary focus:ring-secondary border-neutral-600 rounded"
                required
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-neutral-400">
                I accept the{" "}
                <a href="#" className="text-secondary font-semibold hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm rounded-md font-medium text-black bg-secondary hover:bg-secondary/90 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          <p className="text-neutral-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-secondary font-semibold hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
