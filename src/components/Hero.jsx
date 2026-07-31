import React from "react";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";

export default function Hero() {
    return (
        <section className="bg-[#FAF7F1]">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    <div>

            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
              Welcome to BookVerse
            </span>

                        <h1 className="text-6xl font-serif font-bold leading-tight mt-6">
                            Discover Books
                            <br/>
                            That
                            <span className="text-orange-500">
                {" "}Inspire You
              </span>
                        </h1>

                        <p className="mt-6 text-stone-600 leading-8">
                            Explore thousands of books from your favorite authors.
                            Discover inspiring stories, timeless classics, educational
                            books, and best sellers all in one place.
                        </p>

                        <div className="flex gap-4 mt-8">

                            <button
                                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full flex items-center gap-2">
                                Explore Books
                                <ArrowRight size={18}/>
                            </button>

                            <button
                                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-7 py-3 rounded-full">
                                Learn More
                            </button>

                        </div>

                    </div>

                    <div className="flex justify-center">

                        <img
                            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700"
                            alt="Books"
                            className="rounded-3xl shadow-2xl max-w-md"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}