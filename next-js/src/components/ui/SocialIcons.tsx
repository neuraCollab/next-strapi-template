"use client"

import { FaWhatsapp, FaTelegramPlane, FaInstagram } from "react-icons/fa"

export default function SocialIcons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50" style={{ paddingRight: "env(safe-area-inset-right)" }}>
      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
      >
        <FaWhatsapp size={24} />
      </a>

      <a
        href="https://t.me/your-username"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
      >
        <FaTelegramPlane size={24} />
      </a>

      <a
        href="https://instagram.com/your-profile"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-pink-600 text-white rounded-full shadow-md hover:bg-pink-700 transition"
      >
        <FaInstagram size={24} />
      </a>
    </div>
  )
}
