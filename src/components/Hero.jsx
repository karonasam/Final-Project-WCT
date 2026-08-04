import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-amber-50">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div>
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Independent Online Bookstore
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Books worth
            <br />
            clearing a shelf for.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Discover carefully selected fiction, poetry, and essays
            from writers around the world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/books"
              className="rounded-lg bg-amber-700 px-6 py-3 font-semibold text-white shadow hover:bg-amber-800 transition"
            >
              Browse the Shop
            </Link>

            <Link
              to="/about"
              className="rounded-lg border-2 border-amber-700 px-6 py-3 font-semibold text-amber-700 hover:bg-amber-700 hover:text-white transition"
            >
              Our Story
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <img
            src="https://i.pinimg.com/736x/90/2b/99/902b99f2d416142988afbd25ef0da95d.jpg"
            alt="Books collection"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg px-6 py-4">
            <p className="text-3xl font-bold text-amber-700">
              10,000+
            </p>

            <p className="text-gray-600">
              Books Available
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}