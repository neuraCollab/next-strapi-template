"use client";

import { useState } from "react";

export default function PersonalDashboard() {
    const [user, setUser] = useState({
        name: "Helene Engels",
        email: "helene@example.com",
        address: "2 Miles Drive, NJ 071, New York, USA",
        phone: "+1234 567 890",
        accountType: "PRO Account",
    });

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
            <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
                {/* Breadcrumb */}
                <nav className="mb-4 flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                                Home
                            </a>
                        </li>
                        <li className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/ My Account</span>
                        </li>
                    </ol>
                </nav>

                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">General Overview</h2>

                {/* User Info */}
                <div className="flex items-center space-x-4 p-6 border border-gray-200 rounded-lg dark:border-gray-700">
                    <img className="h-16 w-16 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="User avatar" />
                    <div>
                        <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">{user.accountType}</span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                        <p className="text-gray-500 dark:text-gray-400">{user.phone}</p>
                        <p className="text-gray-500 dark:text-gray-400">{user.address}</p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-6 border-t border-gray-200 py-4 dark:border-gray-700 md:grid-cols-4">
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400">Orders Made</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400">Reviews Added</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">16</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400">Favorites</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400">Returns</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                    </div>
                </div>

                {/* Edit Button */}
                <button className="mt-4 px-5 py-2.5 bg-primary-700 text-white rounded-lg hover:bg-primary-800">
                    Edit Your Data
                </button>
            </div>
        </section>
    );
}
