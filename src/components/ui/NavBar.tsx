"use client"
import axios from "axios"
import { Link } from "lucide-react"
import React, { useState } from "react"
import { FaFacebook, FaTwitter, FaInstagram, FaPhone } from "react-icons/fa"
import useSWR from "swr"
import { ThemeToggle } from "../ThemeToggle"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const { data, error } = useSWR("http://localhost:1337/api/nav-items?sort=order", fetcher)

  if (error) return <nav>Ошибка загрузки</nav>
  if (!data) return <nav>Загрузка...</nav>

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-gray-800 bg-opacity-10 rounded-lg shadow-md">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex justify-center items-center space-x-6 p-4  text-white">
            <div className="flex items-center space-x-2">
              <FaPhone />
              <span>+1 (123) 456-7890</span>
            </div>
          </div>

          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu} // Toggle dropdown menu visibility
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://www.svgrepo.com/show/396954/mage.svg" alt="user photo" />
          </button>
          <ThemeToggle />

          {/* Dropdown menu */}
          <div
            className={`right-0 mt-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${isMenuOpen ? "block" : "hidden"}`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-wrap justify-between font-medium md:space-x-8 md:flex-row">
            {data.data.map((item: any) => (
              <li key={item.id}>
                <a href={item.url}>
                  <span className="text-white hover:underline">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Info Section */}
    </nav>
  )
}

export default Navbar
