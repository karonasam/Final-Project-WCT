import React from "react";
import {Search, User, Heart, Menu} from "lucide-react";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-serif font-bold text-orange-500">
                        BookVerse
                    </h1>
                    <p className="text-xs text-stone-500">
                        Find your next favorite book
                    </p>
                </div>

                <nav className="hidden lg:flex items-center gap-8 font-medium text-stone-700">
                    <a href="/" className="hover:text-orange-500">Home</a>
                    <a href="/books" className="hover:text-orange-500">Books</a>
                    <a href="/about" className="hover:text-orange-500">About</a>

                </nav>

                <div className="hidden md:flex items-center bg-stone-100 rounded-full px-4 py-2 w-72">
                    <Search size={18}/>
                    <input
                        placeholder="Search books..."
                        className="bg-transparent ml-2 w-full outline-none text-sm"
                    />
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <User className="cursor-pointer hover:text-orange-500"/>

                    <Link
                        to="/login"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
                    >
                        Login
                    </Link>
                </div>

                <Menu className="lg:hidden"/>
            </div>
        </header>
    );
}