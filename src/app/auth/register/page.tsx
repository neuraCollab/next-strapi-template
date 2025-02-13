"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            await signIn("credentials", { email: form.email, password: form.password, redirect: false });
            router.push("/");
        }
    };

    return (
        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                    <div>
                        <h4 className="text-white text-lg">Create Your Account</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
                    </div>
                    <div>
                        <h4 className="text-white text-lg">Simple & Secure Registration</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure.</p>
                    </div>
                </div>

                <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-xl font-bold">Create an account</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Name</label>
                            <input name="name" type="text" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Email</label>
                            <input name="email" type="email" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Password</label>
                            <input name="password" type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" onChange={handleChange} />
                        </div>
                        <div className="flex items-center">
                            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
                            <label htmlFor="terms" className="ml-3 block text-sm text-gray-600">
                                I accept the <a href="#" className="text-blue-600 font-semibold hover:underline">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="w-full py-2.5 px-4 text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                            Create an account
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm mt-6 text-center">
                        Already have an account? <a href="/auth/signin" className="text-blue-600 font-semibold hover:underline">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
