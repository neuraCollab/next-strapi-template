"use client";
import { useState } from "react";
import Image from "next/image";
import { FaHome, FaListAlt, FaClipboardList, FaStar, FaComments, FaWallet, FaShieldAlt, FaCogs, FaBell, FaUserSlash, FaBars } from "react-icons/fa";

export default function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Order List", icon: <FaListAlt /> },
    { name: "Order Detail", icon: <FaClipboardList /> },
    { name: "Reviews", icon: <FaStar /> },
    { name: "Chat", icon: <FaComments /> },
    { name: "Wallet", icon: <FaWallet /> },
    { name: "Security", icon: <FaShieldAlt /> },
    { name: "Preferences", icon: <FaCogs /> },
    { name: "Notification Settings", icon: <FaBell /> },
    { name: "Account Deactivation", icon: <FaUserSlash /> },
  ];

  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-sans flex">
      {/* Sidebar */}
      <nav className={`bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-50 transition-all duration-500 
        ${isSidebarOpen ? "w-[250px]" : "w-0 invisible"}`}>
        <div className="pt-8 pb-2 px-6 sticky top-0 bg-white min-h-[80px] z-50">
          <a href="#" className="outline-none">
            <Image src="/logo.svg" alt="logo" width={170} height={40} />
          </a>
        </div>
        <div className="py-6 px-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuClick(item.name)}
                  className={`menu-item text-sm flex items-center cursor-pointer rounded-md px-3 py-3 transition-all duration-300 w-full 
                    ${activeMenu === item.name ? "text-green-700 bg-[#d9f3ea]" : "text-gray-800 hover:bg-[#d9f3ea]"}`}
                >
                  <span className="mr-4 text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden w-10 h-10 z-50 fixed top-5 left-5 cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full text-white shadow-md transition-all duration-500"
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <section className="w-full lg:pl-[250px] transition-all duration-500">
        <header className="z-50 bg-[#f7f6f9] sticky top-0 pt-8 px-8">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex items-center bg-white shadow-sm px-6 py-2 rounded-md w-full max-w-md">
              <input
                type="text"
                placeholder="Search something..."
                className="w-full text-sm bg-transparent outline-none"
              />
            </div>

            {/* Notifications */}
            <div className="flex items-center gap-6">
              <div className="relative bg-blue-200 p-2 rounded-lg cursor-pointer">
                <FaBell className="text-blue-600 text-xl" />
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-1 rounded-full">3</span>
              </div>
              <div className="relative bg-red-200 p-2 rounded-lg cursor-pointer">
                <FaComments className="text-red-600 text-xl" />
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full">5</span>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-3 cursor-pointer">
                <span className="text-gray-500 text-sm">Hi, John</span>
                <Image src="/a.jpg" alt="profile-pic" width={38} height={38} className="rounded-full border-2 border-gray-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-4">{activeMenu}</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* Example Cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white shadow-lg p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <FaListAlt className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Card {index + 1}</h3>
                    <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-800">
                    <p>25 GB</p>
                    <p>50 GB</p>
                  </div>
                  <div className="bg-gray-300 rounded-full w-full h-2.5 mt-2">
                    <div className="w-1/2 h-full bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
