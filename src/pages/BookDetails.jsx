import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import books from "../data/books.js";
import { useCart } from "../context/CartContext.jsx";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const book = books.find((b) => b.id === id);


  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Book not found
        </h1>

        <p className="text-gray-600 mb-6">
          We couldn't find that title.
        </p>

        <Link
          to="/books"
          className="
            inline-block
            border
            border-gray-800
            px-6
            py-3
            rounded-lg
            hover:bg-gray-900
            hover:text-white
            transition
          "
        >
          Back to shop
        </Link>

      </div>
    );
  }

  function handleAddToCart() {
    addItem(book, qty);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  }
  function handleBuyNow() {
    addItem(book, qty);
    navigate("/checkout");
  }
  return (
    <section className="bg-[#f8f5ef] min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white">

            <img
              src={book.image}
              alt={book.title}
              className="
                w-full
                h-[600px]
                object-cover
              "
            />

          </div>
          <div>
            <span className="
              text-sm
              uppercase
              tracking-widest
              text-yellow-700
              font-semibold
            ">
              {book.genre}
            </span>
            <h1 className="
              text-5xl
              font-serif
              font-bold
              text-gray-900
              mt-4
              mb-3
            ">
              {book.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              by {book.author}
            </p>
            <p className="text-gray-700 mb-6">
              ⭐ {book.rating.toFixed(1)}
              <span className="mx-2">
                ·
              </span>
              {book.pages} pages
            </p>
            <p className="
              text-gray-600
              leading-relaxed
              text-lg
              mb-8
            ">
              {book.blurb}
            </p>
            <div className="
              text-3xl
              font-bold
              text-yellow-700
              mb-8
            ">
              ${book.price.toFixed(2)}
            </div>
            <div className="flex flex-wrap items-center gap-4">

              <div className="
                flex
                items-center
                border
                rounded-lg
                overflow-hidden
                bg-white
              ">
                <button
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                  className="
                    px-4
                    py-2
                    hover:bg-gray-100
                    text-xl
                  "
                >
                  −
                </button>
                <span className="px-5 font-semibold">
                  {qty}
                </span>
                <button
                  onClick={() =>
                    setQty((q) => q + 1)
                  }
                  className="
                    px-4
                    py-2
                    hover:bg-gray-100
                    text-xl
                  "
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="
                  px-6
                  py-3
                  border
                  border-gray-800
                  rounded-lg
                  hover:bg-gray-900
                  hover:text-white
                  transition
                "
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="
                  px-6
                  py-3
                  bg-yellow-700
                  text-white
                  rounded-lg
                  hover:bg-yellow-800
                  transition
                "
              >
                Buy now
              </button>



            </div>


          </div>


        </div>


      </div>


    </section>
  );
}