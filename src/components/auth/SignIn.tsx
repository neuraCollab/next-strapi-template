"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // 🔹 Храним ошибку
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Очистка ошибки перед отправкой

        const res = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false
        });

        if (res?.error) {
            console.error("Login Error:", res.error);
            setError("Invalid email or password");
        } else {
            router.push("/");
        }
    };

    const handleOAuthSignIn = async (provider) => {
        setError(""); // Очистка ошибки перед OAuth входом
        const res = await signIn(provider, { redirect: false, callbackUrl: "/" });

        if (res?.error) {
            console.error(`OAuth Login Error [${provider}]:`, res.error);
            setError(`Failed to sign in with ${provider}`);
        } else if (res?.url) {
            window.location.href = res.url; // Редирект после успешного входа
        }
    };

    return (
        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                    <div>
                        <h4 className="text-white text-lg">Sign in to Your Account</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                            Welcome back! Please enter your credentials to access your account.
                        </p>
                    </div>
                </div>

                <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-xl font-bold">Sign in</h3>
                    </div>

                    {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>} {/* 🔹 Вывод ошибки */}

                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="mt-6 space-y-4">
                        <button
                            type="button"
                            className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                            onClick={() => handleOAuthSignIn("google")}
                        >
                            Sign in with Google
                        </button>
                        <button
                            type="button"
                            className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            onClick={() => handleOAuthSignIn("vk")}
                        >
                            Sign in with VK
                        </button>
                        <button
                            type="button"
                            className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
                            onClick={() => handleOAuthSignIn("yandex")}
                        >
                            Sign in with Yandex
                        </button>
                    </div>

                    <p className="text-gray-600 text-sm mt-6 text-center">
                        Don't have an account?
                        <a href="/auth/register" className="text-blue-600 font-semibold hover:underline"> Register here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
