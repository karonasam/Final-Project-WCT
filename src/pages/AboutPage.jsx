import React from "react";
import {BookOpen, Users, Star, Heart} from "lucide-react";

export default function About() {
    return (
        <div className="bg-[#faf7f1]">

            {/* Hero */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">

                    <div>
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
              About BookVerse
            </span>

                        <h1 className="text-5xl lg:text-6xl font-serif font-bold mt-6 leading-tight text-stone-900">
                            More Than a Book Website,
                            <span className="text-orange-500"> A Place to Discover Stories</span>
                        </h1>

                        <p className="mt-6 text-stone-600 leading-8">
                            BookVerse is designed for readers who love discovering new books,
                            exploring different genres, and finding their next favorite read.
                            Our goal is to make browsing books simple, enjoyable, and inspiring
                            for everyone.
                        </p>

                        <button
                            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition">
                            Explore Books
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900"
                            alt="Library"
                            className="rounded-3xl shadow-xl"
                        />
                    </div>

                </div>
            </section>


            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-4xl font-serif font-bold">
                        Our Mission
                    </h2>

                    <p className="mt-6 text-stone-600 max-w-3xl mx-auto leading-8">
                        We believe every reader deserves an easy way to discover books that
                        match their interests. Whether you're searching for bestselling
                        novels, educational resources, inspiring biographies, or timeless
                        classics, BookVerse helps you explore books with confidence.
                    </p>

                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition">
                            <BookOpen className="text-orange-500 mb-5" size={40}/>

                            <h3 className="text-xl font-bold mb-3">
                                Thousands of Books
                            </h3>

                            <p className="text-stone-500">
                                Browse books from different genres and discover your next
                                favorite story.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition">
                            <Star className="text-orange-500 mb-5" size={40}/>

                            <h3 className="text-xl font-bold mb-3">
                                Top Rated Picks
                            </h3>

                            <p className="text-stone-500">
                                Find highly rated books recommended by readers from around the
                                world.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition">
                            <Heart className="text-orange-500 mb-5" size={40}/>

                            <h3 className="text-xl font-bold mb-3">
                                Save Favorites
                            </h3>

                            <p className="text-stone-500">
                                Keep track of books you love and build your own reading list.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition">
                            <Users className="text-orange-500 mb-5" size={40}/>

                            <h3 className="text-xl font-bold mb-3">
                                For Every Reader
                            </h3>

                            <p className="text-stone-500">
                                Whether you're a beginner or a passionate reader, BookVerse is
                                made for everyone.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section className="py-20 bg-orange-500 text-white">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                        <div>
                            <h2 className="text-5xl font-bold">10K+</h2>
                            <p className="mt-3">Books</p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold">500+</h2>
                            <p className="mt-3">Authors</p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold">50+</h2>
                            <p className="mt-3">Categories</p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold">25K+</h2>
                            <p className="mt-3">Readers</p>
                        </div>

                    </div>

                </div>
            </section>


            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto text-center px-6">

                    <h2 className="text-5xl font-serif font-bold text-stone-900">
                        Start Your Reading Journey Today
                    </h2>

                    <p className="mt-6 text-stone-600 leading-8">
                        Every great story begins with a single page. Explore our collection,
                        discover inspiring books, and find the perfect read for your next
                        adventure.
                    </p>

                    <button
                        className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition">
                        Browse Books
                    </button>

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

        </div>
    );
}