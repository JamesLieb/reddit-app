import React from "react";
import RedditLogo from '../Reddit_Logo.png';
import SearchBar from "./SearchBar.jsx";

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-white to-gray-50 border-b-2 border-orange-500 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Logo and Title Section */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                    <img 
                        className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
                        src={RedditLogo} 
                        alt="Reddit Logo" 
                        height={80} 
                        width={80} 
                    />
                    <div>
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                            Reddit App
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide">
                            Explore the Front Page of the Internet
                        </p>
                    </div>
                </div>
                
                {/* Search Bar Section */}
                <div className="mt-4">
                    <SearchBar />
                </div>
            </div>
            
            {/* Decorative bottom accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </header>
    )
};