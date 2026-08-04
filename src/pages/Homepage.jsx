import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import books from "../data/books.js";
import BookCard from "../components/BookCard.jsx";


const genres = [...new Set(books.map((b) => b.genre))]; 
export default function HomePage() {

  const featured = books.slice(0, 4);
  return (
    <>
      <Hero />
      <section className="py-16 bg-[#f8f5ef]">

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
            <div>
              <span className="text-sm uppercase tracking-widest text-yellow-700 font-semibold">
                Editor's picks
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mt-3">
                New on the shelf
              </h2>

            </div>

            <Link
              to="/books"
              className="text-yellow-700 font-semibold hover:text-yellow-900 transition"
            >
              View all books →
            </Link>
          </div>
          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
          ">

            {featured.map((book) => (

              <BookCard
                key={book.id}
                book={book}
              />

            ))}

          </div>
        </div>

      </section>
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
<span className="text-sm uppercase tracking-widest text-yellow-700 font-semibold">
            Browse by genre
          </span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mt-3 mb-8">
            Find your next read
          </h2>
          <div className="flex flex-wrap gap-4">
            {genres.map((g) => (

              <Link
                key={g}
                to={`/books?genre=${encodeURIComponent(g)}`}
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-white
                  border
                  border-gray-200
                  text-gray-700
                  hover:bg-yellow-700
                  hover:text-white
                  transition
                "
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}