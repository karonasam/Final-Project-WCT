import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import books from "../data/books";

export default function BooksPage() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  const genre = searchParams.get("genre") || "";


  const filteredBooks = useMemo(() => {
    return books.filter((book) => {

      const matchesGenre =
        !genre || book.genre.toLowerCase() === genre.toLowerCase();


      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());


      return matchesGenre && matchesSearch;

    });
  }, [genre, search]);



  return (
    <section className="bg-[#f8f5ef] min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">

          <div>
            <span className="text-sm uppercase tracking-widest text-yellow-700 font-semibold">
              Book Collection
            </span>

            <h1 className="text-5xl font-serif font-bold text-gray-900 mt-3">
              Browse Books
            </h1>
          </div>

          <input
            type="text"
            placeholder="Search books..."
            className="
              w-full md:w-80
              px-5 py-3
              rounded-lg
              border border-gray-300
              bg-white
              outline-none
              focus:ring-2 focus:ring-yellow-600
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
        {genre && (
          <p className="my-6 text-gray-700">
            Showing genre:
            <strong className="ml-2 text-yellow-700">
              {genre}
            </strong>
          </p>
        )}
        {filteredBooks.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-600">
            No books found.
          </div>

        ) : (

          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          ">
            {filteredBooks.map((book) => (

              <BookCard
                key={book.id}
                book={book}
              />

            ))}
          </div>

        )}


      </div>

    </section>
  );
}