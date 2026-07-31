import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#2D2A26] text-white">

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-4 gap-10">

                <div>

                    <h2 className="text-3xl font-serif text-orange-400 mb-4">
                        BookVerse
                    </h2>

                    <p className="text-stone-300">
                        Discover amazing books and enjoy reading with BookVerse.
                    </p>

                </div>

                <div>

                    <h3 className="font-semibold mb-4">Quick Links</h3>

                    <ul className="space-y-2 text-stone-300">
                        <li>Home</li>
                        <li>Books</li>
                        <li>About</li>

                    </ul>

                </div>

                <div>

                    <h3 className="font-semibold mb-4">Categories</h3>

                    <ul className="space-y-2 text-stone-300">
                        <li>Fiction</li>
                        <li>Business</li>
                        <li>Romance</li>
                        <li>Fantasy</li>
                    </ul>

                </div>

                <div>

                    <h3 className="font-semibold mb-4">
                        Stay Connected
                    </h3>

                    <p className="text-stone-300">
                        Follow BookVerse for the latest book recommendations and updates.
                    </p>

                </div>

            </div>

            <div className="border-t border-stone-700 py-5 text-center text-stone-400">
                © 2026 BookVerse. All Rights Reserved.
            </div>

        </footer>
    );
}