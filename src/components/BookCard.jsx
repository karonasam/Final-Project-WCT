import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function BookCard({ book }) {
  const { addItem } = useCart();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link
        to={`/books/${book.id}`}
        className="relative block h-96 overflow-hidden"
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
          <span className="mb-2 w-fit rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white">
            {book.genre}
          </span>

          <h3 className="text-xl font-bold text-white">
            {book.title}
          </h3>

          <p className="text-sm text-gray-200">
            {book.author}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between p-5">

        <div>
          <Link
            to={`/books/${book.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-amber-700"
          >
            {book.title}
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            {book.author}
          </p>
        </div>

        <div className="text-right">
          <p className="mb-3 text-xl font-bold text-amber-700">
            ${book.price.toFixed(2)}
          </p>

          <button
            onClick={() => addItem(book, 1)}
            className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
}