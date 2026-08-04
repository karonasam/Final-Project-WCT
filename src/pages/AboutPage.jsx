import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="py-16 bg-[#f8f5ef]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="inline-block text-sm uppercase tracking-widest text-yellow-700 font-semibold mb-4">
              Our story
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
              A shelf,
              <br />
              not a feed.
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Bookverse was created for readers who want more
              than trending lists and recommendation algorithms.
              Every book is carefully selected by passionate
              editors and booksellers.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We support independent authors and small presses,
              helping stories reach readers while giving creators
              a fair share of their work.
            </p>

            <Link
              to="/books"
              className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Explore Books
            </Link>

          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              alt="Book shelves"
              className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-16">

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-4xl font-bold text-yellow-700">
              500+
            </h3>
            <p className="mt-3 text-gray-600">
              Independent authors published
            </p>
          </div>


          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-4xl font-bold text-yellow-700">
              12
            </h3>
            <p className="mt-3 text-gray-600">
              Editors reading full-time
            </p>
          </div>


          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-4xl font-bold text-yellow-700">
              70%
            </h3>
            <p className="mt-3 text-gray-600">
              Average royalty share to authors
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}