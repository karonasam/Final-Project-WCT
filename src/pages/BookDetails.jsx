import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebase";

export default function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookRef = doc(db, "books", id);
        const snapshot = await getDoc(bookRef);

        if (snapshot.exists()) {
          setBook({
            id: snapshot.id,
            ...snapshot.data(),
          });
        }
      } catch (error) {
        console.error("Error loading book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading book...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Book not found
        </h1>

        <Link
          to="/books"
          className="mt-5 rounded-full bg-[#3f2a1d] px-6 py-3 text-white"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f0e4] px-6 py-32">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/books"
          className="mb-8 inline-block font-bold text-[#a56519]"
        >
          ← Back to Books
        </Link>

        <div className="grid gap-12 rounded-[35px] bg-[#fffaf3] p-8 shadow-xl md:grid-cols-2">

          {/* IMAGE */}
          <div className="flex items-center justify-center rounded-[28px] bg-[#f2e4d0] p-10">
            <img
              src={book.imageUrl || FALLBACK_IMAGE}
              alt={book.title}
              className="h-[450px] w-[300px] rounded-lg object-cover shadow-2xl"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b87318]">
              {book.category || "Book"}
            </p>

            <h1 className="mt-3 text-4xl font-black text-[#30281f] md:text-5xl">
              {book.title}
            </h1>

            <p className="mt-4 text-lg text-[#887967]">
              by {book.author || "Unknown Author"}
            </p>

            <div className="my-7 h-px bg-[#e5d9c8]" />

            <p className="leading-7 text-[#6f604f]">
              Discover more about this book and explore
              its story, author, and details.
            </p>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase text-[#a99a89]">
                Price
              </p>

              <p className="mt-1 text-3xl font-black text-[#a56519]">
                ${Number(book.price || 0).toFixed(2)}
              </p>
            </div>

            <button className="mt-8 rounded-full bg-[#3f2a1d] px-6 py-4 font-bold text-white transition hover:bg-[#5b3d27]">
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}