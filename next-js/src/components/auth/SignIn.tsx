"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const [form, setForm] = useState({ email: "", password: "" })
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

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (res?.error) {
      console.error("Login Error:", res.error)
      setError("Invalid email or password")
    } else {
      router.push(callbackUrl)
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    setError("")
    const res = await signIn(provider, { redirect: false, callbackUrl })

    if (res?.error) {
      console.error(`OAuth Login Error [${provider}]:`, res.error)
      setError(`Failed to sign in with ${provider}`)
    } else if (res?.url) {
      window.location.href = res.url
    }
  }

  return (
    <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center rounded-xl overflow-hidden border border-neutral-800">
        <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-neutral-900 to-neutral-800 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg">Sign in to Your Account</h4>
            <p className="text-[13px] text-neutral-400 mt-3 leading-relaxed">
              Welcome back! Please enter your credentials to access your account.
            </p>
          </div>
        </div>

        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto bg-neutral-950" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-white text-xl font-bold">Sign in</h3>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="space-y-6">
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
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm rounded-md font-medium text-black bg-secondary hover:bg-secondary/90 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <button
              type="button"
              className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-neutral-800 hover:bg-neutral-700 focus:outline-none"
              onClick={() => handleOAuthSignIn("github")}
            >
              Sign in with GitHub
            </button>
            <button
              type="button"
              className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-neutral-800 hover:bg-neutral-700 focus:outline-none"
              onClick={() => handleOAuthSignIn("yandex")}
            >
              Sign in with Yandex
            </button>
          </div>
          <p className="text-neutral-400 text-sm mt-6 text-center">
            Don&apos;t have an account?
            <a href="/auth/register" className="text-secondary font-semibold hover:underline">
              {" "}
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
