import React from "react";
import {Star} from "lucide-react";
import Hero from "../components/Hero";

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        price: "$25",
        rating: 5,
        desc: "Build better habits one small step at a time.",
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    },
    {
        id: 2,
        title: "Deep Work",
        author: "Cal Newport",
        price: "$22",
        rating: 4,
        desc: "Learn how to focus and achieve meaningful success.",
        image: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    },
    {
        id: 3,
        title: "Ikigai",
        author: "Hector Garcia",
        price: "$20",
        rating: 5,
        desc: "Discover the Japanese secret to a happy life.",
        image: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
    },
    {
        id: 4,
        title: "Psychology of Money",
        author: "Morgan Housel",
        price: "$28",
        rating: 5,
        desc: "Timeless lessons on wealth and human behavior.",
        image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    },

];

const categories = [
    "📖 Fiction",
    "🧠 Self Help",
    "💼 Business",
    "❤️ Romance",
    "🏰 Fantasy",
    "🔬 Science",
];

export default function HomePage() {
    return (
        <>
            <Hero/>
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-stone-800">
                            Explore Categories
                        </h2>
                        <p className="text-stone-500 mt-3">
                            Discover books from different genres and find your next favorite
                            read.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className="bg-[#faf7f1] rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                            >
                                <h3 className="font-semibold">{category}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#faf7f1]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-serif font-bold">
                                Featured Books
                            </h2>
                            <p className="text-stone-500 mt-2">
                                Hand-picked books recommended for every reader.
                            </p>
                        </div>

                        <button className="text-orange-500 font-semibold hover:underline">
                            View All →
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition duration-300"
                            >
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-72 object-cover"
                                />

                                <div className="p-5">
                                    <h3 className="font-bold text-lg">{book.title}</h3>

                                    <p className="text-sm text-stone-500">{book.author}</p>

                                    <div className="flex items-center gap-1 mt-2">
                                        {[...Array(book.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm text-stone-500 mt-3">
                                        {book.desc}
                                    </p>

                                    <div className="flex justify-between items-center mt-5">
                    <span className="text-2xl font-bold text-orange-500">
                      {book.price}
                    </span>

                                        <button
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-serif font-bold">
                            Why Choose BookVerse?
                        </h2>

                        <p className="text-stone-500 mt-3">
                            More than a bookstore — a place to discover your next favorite
                            story.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-orange-50 rounded-3xl p-10 text-center hover:shadow-lg transition">
                            <div className="text-5xl mb-5">📚</div>
                            <h3 className="font-bold text-xl mb-3">Wide Collection</h3>
                            <p className="text-stone-500">
                                Browse books across many genres from timeless classics to modern
                                bestsellers.
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-3xl p-10 text-center hover:shadow-lg transition">
                            <div className="text-5xl mb-5">⭐</div>
                            <h3 className="font-bold text-xl mb-3">Top Rated Books</h3>
                            <p className="text-stone-500">
                                Find highly rated books loved by readers around the world.
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-3xl p-10 text-center hover:shadow-lg transition">
                            <div className="text-5xl mb-5">❤️</div>
                            <h3 className="font-bold text-xl mb-3">Personal Favorites</h3>
                            <p className="text-stone-500">
                                Save books you love and build your own reading collection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-5xl font-serif font-bold">
                        "A reader lives a thousand lives before he dies."
                    </h2>

                    <p className="mt-6 text-lg opacity-90">
                        Discover inspiring stories, timeless classics, and unforgettable
                        adventures with BookVerse.
                    </p>

                    <button
                        className="mt-10 bg-white text-orange-500 font-semibold px-8 py-3 rounded-full hover:scale-105 transition">
                        Browse Collection
                    </button>
                </div>
            </section>
        </>
    );
}