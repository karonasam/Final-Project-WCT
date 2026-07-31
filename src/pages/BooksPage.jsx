import React from "react";
import {Star} from "lucide-react";
import {Link} from "react-router-dom";

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        price: "$25",
        rating: 5,
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    },
    {
        id: 2,
        title: "Deep Work",
        author: "Cal Newport",
        price: "$22",
        rating: 4,
        image: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    },
    {
        id: 3,
        title: "Ikigai",
        author: "Hector Garcia",
        price: "$20",
        rating: 5,
        image: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
    },
    {
        id: 4,
        title: "Psychology of Money",
        author: "Morgan Housel",
        price: "$28",
        rating: 5,
        image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    },
    {
        id: 5,
        title: "Broke on Moday, Boss by Friday",
        author: "Morgan Housel",
        price: "$21",
        rating: 5,
        desc: " build wealth from your skills instead of your salary.",
        image: "https://i.pinimg.com/736x/9e/4d/e9/9e4de970ae212592058ac4bd148aaa7a.jpg",
    },
    {
        id: 6,
        title: "Lock Every door",
        author: "Morgan Housel",
        price: "$25",
        rating: 5,
        desc: "Mystery novel thriller horror psychological thriller drama books novel bookstagram horror novels.",
        image: "https://i.pinimg.com/1200x/8a/a4/e6/8aa4e6eff87685572f47aa636d75ef80.jpg",
    },
    {
        id: 7,
        title: "To the man i loved too much",
        author: "Morgan Housel",
        price: "$30",
        rating: 5,
        desc: "A raw and emotional poetry collection that puts words to the heartbreak .",
        image: "https://i.pinimg.com/736x/b2/4d/68/b24d68b440bed440eb15e7173353a314.jpg",
    },
    {
        id: 8,
        title: "Feminine energy",
        author: "Morgan Housel",
        price: "$17",
        rating: 5,
        desc: "Becoming high value with femenine",
        image: "https://i.pinimg.com/736x/01/4e/a3/014ea34e9d715aea48f464046eee9e6f.jpg",
    },
    {
        id: 9,
        title: "Ego is the Enemy",
        author: "Morgan Housel",
        price: "$12",
        rating: 5,
        desc: "Insightful quotes from 'Ego Is the Enemy' by Ryan Holiday inspire humility, growth, and resilience.",
        image: "https://i.pinimg.com/736x/57/2e/a6/572ea6574c4d3e57efb3b36b3966ee1c.jpg",
    },
    {
        id: 10,
        title: "Power",
        author: "Morgan Housel",
        price: "$28",
        rating: 5,
        desc: "The Concise 48 Laws of Power by Robert Greene is a must-read for anyone looking to master influence, strategy, and leadership",
        image: "https://i.pinimg.com/1200x/d3/97/44/d39744746c3029f8812c3b19230fe7ce.jpg",
    },
];

export default function BooksPage() {
    return (
        <section className="py-20 bg-[#faf7f1] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif font-bold text-stone-800">
                        Explore Our Books
                    </h1>

                    <p className="text-stone-500 mt-4">
                        Find your next favorite book from our collection.
                    </p>
                </div>


                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="flex-1 px-5 py-3 rounded-full border focus:outline-none"
                    />

                    <select className="px-5 py-3 rounded-full border">
                        <option>All Categories</option>
                        <option>Fiction</option>
                        <option>Self Help</option>
                        <option>Business</option>
                        <option>Romance</option>
                    </select>
                </div>


                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition"
                        >

                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-72 object-cover"
                            />

                            <div className="p-5">

                                <h2 className="font-bold text-xl">
                                    {book.title}
                                </h2>

                                <p className="text-stone-500">
                                    {book.author}
                                </p>


                                <div className="flex mt-3">
                                    {[...Array(book.rating)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={18}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>


                                <div className="flex justify-between items-center mt-5">

                  <span className="text-orange-500 font-bold text-xl">
                    {book.price}
                  </span>

                                    <Link
                                        to={`/books/${book.id}`}
                                        className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
                                    >
                                        Details
                                    </Link>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
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
        </section>
        
    );
}