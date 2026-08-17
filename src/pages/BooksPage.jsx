import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";  
import { Link, useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85";

const floatingBooks = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=80",
];

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6" />
    </svg>
  );
}

function BookCard({ book, index, wishlist, setWishlist }) {
  const isWishlisted = wishlist.includes(book.id);

  const toggleWishlist = () => {
    setWishlist((current) =>
      current.includes(book.id)
        ? current.filter((id) => id !== book.id)
        : [...current, book.id]
    );
  };

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#fffaf3] p-4 shadow-[0_8px_25px_rgba(63,42,29,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(63,42,29,0.13)]">
      {index < 3 && (
        <div className="absolute left-7 top-7 z-20 rounded-full bg-[#f5c83d] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-[#3f2a1d]">
          {index === 0 ? "Featured" : "Popular"}
        </div>
      )}

      <button
        onClick={toggleWishlist}
        className={`absolute right-7 top-7 z-20 flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-300 ${
          isWishlisted
            ? "bg-[#3f2a1d] text-[#f5c83d]"
            : "bg-white/90 text-[#806e5b] hover:bg-[#3f2a1d] hover:text-[#f5c83d]"
        }`}
      >
        <HeartIcon filled={isWishlisted} />
      </button>

      <div className="relative flex h-[285px] items-center justify-center overflow-hidden rounded-[22px] bg-[#f2e4d0]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,200,61,0.2),_transparent_65%)]" />

        <img
          src={book.imageUrl || FALLBACK_IMAGE}
          alt={book.title || "Book"}
          className="relative h-[230px] w-[155px] rounded-md object-cover shadow-[8px_15px_25px_rgba(63,42,29,0.25)] transition duration-500 group-hover:-rotate-2 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

 <button
  onClick={() => navigate("/checkout")}
  className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-16 items-center justify-center rounded-full bg-[#3f2a1d] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#5c3d28]"
  title="Buy this book"
>
  <ShoppingBagIcon />
</button>
      </div>

      <div className="px-2 pb-1 pt-5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b87318]">
          {book.category || "Book"}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-[52px] text-[18px] font-black leading-7 text-[#30281f]">
          {book.title || "Untitled Book"}
        </h3>

        <p className="mt-1 truncate text-sm text-[#887967]">
          {book.author || "Unknown Author"}
        </p>

        <div className="mt-4 flex items-center gap-1 text-[#d39b1f]">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <span className="ml-1 text-[10px] text-[#a99a89]">
            4.9
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#a99a89]">
              Price
            </p>

            <p className="text-xl font-black text-[#a56519]">
              ${Number(book.price || 0).toFixed(2)}
            </p>
          </div>

          <Link
  to={`/books/${book.id}`}
  className="rounded-full border border-[#d9c7ad] px-4 py-2 text-xs font-bold text-[#3f2a1d] transition hover:border-[#3f2a1d] hover:bg-[#3f2a1d] hover:text-white"
>
  View
</Link>
        </div>
      </div>
    </article>
  );
}

function BookSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-[#eadcc8] bg-[#fffaf3] p-4">
      <div className="h-[285px] rounded-[22px] bg-[#eee1ce]" />

      <div className="space-y-3 px-2 pt-5">
        <div className="h-3 w-24 rounded bg-[#eadcc8]" />
        <div className="h-5 w-3/4 rounded bg-[#eadcc8]" />
        <div className="h-4 w-1/2 rounded bg-[#eadcc8]" />
        <div className="h-5 w-20 rounded bg-[#eadcc8]" />
      </div>
    </div>
  );
}

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(
          collection(db, "books")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("BOOKS:", data);

        setBooks(data);
      } catch (err) {
        console.error("Error loading books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        setCategoryError("");

        const snapshot = await getDocs(
          collection(db, "categories")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
        setCategoryError(err.message);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categoryNames = useMemo(() => {
    const firebaseCategories = categories
      .map((category) => category.name)
      .filter(Boolean);

    const bookCategories = books
      .map((book) => book.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set([
        ...firebaseCategories,
        ...bookCategories,
      ]),
    ];
  }, [categories, books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((book) => {
        return (
          book.title?.toLowerCase().includes(query) ||
          book.author?.toLowerCase().includes(query) ||
          book.category?.toLowerCase().includes(query)
        );
      });
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (book) => book.category === selectedCategory
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.title || "").localeCompare(
          b.title || ""
        )
      );
    }

    if (sortBy === "newest") {
      result.sort((a, b) => {
        const aTime = a.createdAt?.toMillis
          ? a.createdAt.toMillis()
          : new Date(
              a.createdAt || 0
            ).getTime();

        const bTime = b.createdAt?.toMillis
          ? b.createdAt.toMillis()
          : new Date(
              b.createdAt || 0
            ).getTime();

        return bTime - aTime;
      });
    }

    return result;
  }, [
    books,
    search,
    selectedCategory,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#f8f0e4] text-[#30281f]">
      <section className="relative isolate overflow-hidden bg-[#3f2a1d] px-6 pb-20 pt-32 lg:px-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-10 h-96 w-96 animate-pulse rounded-full bg-[#f5c83d]/10 blur-3xl" />

          <div
            className="absolute -right-40 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-[#b87318]/10 blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="absolute left-[15%] top-[30%] h-2 w-2 animate-ping rounded-full bg-[#f5c83d]/50" />

          <div
            className="absolute right-[18%] top-[25%] h-3 w-3 animate-bounce rounded-full bg-[#fbeede]/30"
            style={{ animationDuration: "3s" }}
          />

          <div className="absolute bottom-[25%] left-[25%] h-2 w-2 animate-pulse rounded-full bg-[#f5c83d]/40" />
        </div>

        <div
          className="pointer-events-none absolute left-[4%] top-[25%] hidden lg:block"
          style={{
            animation:
              "floatLeft 6s ease-in-out infinite",
          }}
        >
          <div className="-rotate-12 rounded-lg bg-[#24170f] p-2 shadow-2xl">
            <img
              src={floatingBooks[0]}
              alt=""
              className="h-52 w-36 rounded object-cover"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute right-[5%] top-[22%] hidden lg:block"
          style={{
            animation:
              "floatRight 7s ease-in-out infinite",
          }}
        >
          <div className="rotate-12 rounded-lg bg-[#24170f] p-2 shadow-2xl">
            <img
              src={floatingBooks[1]}
              alt=""
              className="h-60 w-40 rounded object-cover"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-[12%] left-[15%] hidden lg:block"
          style={{
            animation:
              "floatSmall 5s ease-in-out infinite",
          }}
        >
          <div className="rotate-6 rounded-lg bg-[#24170f] p-1.5 shadow-xl">
            <img
              src={floatingBooks[2]}
              alt=""
              className="h-32 w-24 rounded object-cover"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-[13%] right-[15%] hidden lg:block"
          style={{
            animation:
              "floatSmallReverse 6s ease-in-out infinite",
          }}
        >
          <div className="-rotate-6 rounded-lg bg-[#24170f] p-1.5 shadow-xl">
            <img
              src={floatingBooks[3]}
              alt=""
              className="h-36 w-24 rounded object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div
            className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#80654a] bg-white/5 px-5 py-2.5 backdrop-blur-sm"
            style={{
              animation:
                "fadeUp 0.8s ease-out forwards",
            }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f5c83d]" />

            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#f5c83d]">
              Your next chapter starts here
            </span>
          </div>

          <h1
            className="text-5xl font-black leading-[0.95] tracking-tight text-[#fff8ed] sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              animation:
                "fadeUp 0.9s ease-out 0.15s both",
            }}
          >
            Stories waiting
            <br />

            <span className="text-[#f5c83d]">
              to be discovered.
            </span>
          </h1>

          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#d8c7b1] md:text-lg"
            style={{
              animation:
                "fadeUp 0.9s ease-out 0.3s both",
            }}
          >
            From timeless classics to fresh new ideas,
            discover books that inspire, entertain, and
            stay with you long after the final page.
          </p>

          <div
            className="mx-auto mt-9 max-w-2xl"
            style={{
              animation:
                "fadeUp 0.9s ease-out 0.45s both",
            }}
          >
            <div className="group flex items-center rounded-2xl border border-white/10 bg-[#fffaf2] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition focus-within:scale-[1.02]">
              <div className="pl-4 text-[#806e5b]">
                <SearchIcon />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="What would you like to read?"
                className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-[#30281f] outline-none placeholder:text-[#a99a89] md:text-base"
              />

              <button
                onClick={() =>
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="rounded-xl bg-[#3f2a1d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#5b3d27]"
              >
                Search
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#bda88e]">
              <span>Popular:</span>

              {[
                "Fiction",
                "Romance",
                "Classic",
                "Self Growth",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setSearch(item)}
                  className="rounded-full border border-[#72583e] px-3 py-1.5 transition hover:border-[#f5c83d] hover:text-[#f5c83d]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-5 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-black text-white">
                {loading ? "..." : books.length}
              </p>

              <p className="mt-1 text-xs text-[#aa967c]">
                Books
              </p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <p className="text-2xl font-black text-white">
                {categoryLoading
                  ? "..."
                  : categories.length}
              </p>

              <p className="mt-1 text-xs text-[#aa967c]">
                Categories
              </p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <p className="text-2xl font-black text-white">
                5K+
              </p>

              <p className="mt-1 text-xs text-[#aa967c]">
                Readers
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes floatLeft {
            0%, 100% {
              transform: translateY(0px) rotate(-12deg);
            }

            50% {
              transform: translateY(-24px) rotate(-7deg);
            }
          }

          @keyframes floatRight {
            0%, 100% {
              transform: translateY(0px) rotate(12deg);
            }

            50% {
              transform: translateY(-28px) rotate(17deg);
            }
          }

          @keyframes floatSmall {
            0%, 100% {
              transform: translateY(0px) rotate(6deg);
            }

            50% {
              transform: translateY(-16px) rotate(2deg);
            }
          }

          @keyframes floatSmallReverse {
            0%, 100% {
              transform: translateY(0px) rotate(-6deg);
            }

            50% {
              transform: translateY(-18px) rotate(-11deg);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      <section className="border-b border-[#e6d9c7] bg-[#fffaf2] px-6 py-5 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <span className="mr-2 shrink-0 text-xs font-black uppercase tracking-widest text-[#9a8874]">
              Browse
            </span>

            {categoryNames.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  selectedCategory === category
                    ? "bg-[#3f2a1d] text-white shadow-md"
                    : "bg-[#f4eadb] text-[#6c5b48] hover:bg-[#eadcc8]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main
        id="collection"
        className="px-6 py-16 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b87318]">
                Our Collection
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                Find your next favorite.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#887967]">
                Explore books selected for curious minds,
                dreamers, learners, and everyone in between.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#887967]">
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="rounded-xl border border-[#dfd1bd] bg-[#fffaf2] px-4 py-3 text-sm font-semibold text-[#4b3b2b] outline-none focus:border-[#3f2a1d]"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="name">
                  Name A-Z
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-y border-[#e5d9c8] py-4">
            <p className="text-sm text-[#776753]">
              <span className="font-black text-[#3f2a1d]">
                {filteredBooks.length}
              </span>{" "}
              {filteredBooks.length === 1
                ? "book"
                : "books"}{" "}
              found
            </p>

            {(search ||
              selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="text-xs font-bold text-[#a56519] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              <p className="font-bold">
                Couldn't load books
              </p>

              <p className="mt-1">{error}</p>
            </div>
          )}

          {categoryError && (
            <p className="mt-4 text-xs text-red-500">
              Categories could not be loaded.
            </p>
          )}

          {loading && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <BookSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading &&
            filteredBooks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#efe2cf] text-3xl">
                  📚
                </div>

                <h3 className="text-2xl font-black">
                  No books found
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#887967]">
                  Try searching for another title,
                  author, or category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="mt-6 rounded-full bg-[#3f2a1d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#5a3c28]"
                >
                  Show all books
                </button>
              </div>
            )}

          {!loading &&
            filteredBooks.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.map((book, index) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    index={index}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                  />
                ))}
              </div>
            )}
        </div>
      </main>

      <section className="px-6 pb-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[35px] bg-[#3f2a1d]">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#f5c83d]/10 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#f5c83d]/10 blur-3xl" />

          <div className="relative px-8 py-16 text-center md:px-16">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#f5c83d]">
              Keep Exploring
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#fff7eb] md:text-5xl">
              Every great story
              <br />
              starts with one page.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#d5c3ab]">
              Find something new, discover a different
              perspective, and let your next favorite book
              find you.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f5c83d] px-7 py-3.5 text-sm font-black text-[#3f2a1d] transition hover:scale-105 hover:bg-[#e9b82b]"
            >
              Explore Collection
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}