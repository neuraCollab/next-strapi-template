
import React from 'react';
import Navbar from './NavBar';

const Header = () => (
    <header className="relative w-full h-screen">

        {/* Video Background */}
        <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
        >
            <source src="IMG_1711.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white">
            {/* Navigation */}

            {/* Main Text */}
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-lg mb-6">We offer innovative solutions for your business.</p>

            {/* Buttons */}
            <div>
                <a
                    href="#services"
                    className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg mr-4"
                >
                    Our Services
                </a>
                <a
                    href="#contact"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg"
                >
                    Contact Us
                </a>
            </div>
        </div>
    </header>
);

export default Header;
