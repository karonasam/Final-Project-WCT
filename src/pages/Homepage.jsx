import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  Star,
} from "lucide-react";

import BookCard from "../components/BookCard.jsx";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));

        const firestoreBooks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(firestoreBooks);
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

 
  const featured = books.slice(0, 4);

  const bookOfTheWeek = books.length > 0 ? books[0] : null;

  const stats = [
    {
      icon: BookOpen,
      label: "Books",
      value: `${books.length}+`,
    },
    {
      icon: Users,
      label: "Readers",
      value: "12k+",
    },
  ];

  return (
    <>
    
      <section className="relative overflow-hidden bg-[#fff8ed]">

     
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#e7b45a]/20 blur-3xl" />

        <div className="absolute top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#f1d49b]/30 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-[#d68a32]/10 blur-3xl" />

  
        <div className="pointer-events-none absolute left-[7%] top-32 hidden xl:block rotate-[-15deg] opacity-10">
          <BookOpen className="w-32 h-32" />
        </div>

        <div className="pointer-events-none absolute right-[8%] top-20 hidden xl:block rotate-[15deg] opacity-10">
          <BookOpen className="w-24 h-24" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 lg:pt-28 lg:pb-36">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

         
            <div className="max-w-2xl">

          
              <div className="inline-flex items-center gap-3 mb-6">

                <span className="w-10 h-px bg-[#b9680b]" />

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b9680b]">
                  Your next great read
                </span>

              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#28251d] leading-[0.98] tracking-tight">

                Stories that

                <br />

                <span className="text-[#b9680b]">
                  stay with you.
                </span>

              </h1>

         
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f675b]">
                Discover carefully selected books, timeless classics,
                and unforgettable stories made for curious readers.
              </p>

          
              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  to="/books"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#b9680b] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#b9680b]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#9f5908] hover:shadow-xl"
                >
                  Explore our books

                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d8cbb9] bg-white/60 px-7 py-4 text-sm font-bold text-[#28251d] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Our story
                </Link>

              </div>

       
              <div className="mt-14 flex flex-wrap gap-8 sm:gap-12">

                {stats.map(({ icon: Icon, label, value }) => (

                  <div
                    key={label}
                    className="flex items-center gap-3"
                  >

                 
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b9680b]/10">

                      <Icon className="h-5 w-5 text-[#b9680b]" />

                    </div>

                  
                    <div>

                      <p className="text-xl font-bold text-[#28251d]">
                        {loading ? "..." : value}
                      </p>

                      <p className="text-xs uppercase tracking-wide text-[#8b8378]">
                        {label}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

           
            <div className="relative flex justify-center lg:justify-end">

              <div className="absolute w-[420px] h-[420px] rounded-full bg-[#e9c98f]/40 blur-3xl" />

              <div className="relative">

               
                <div className="absolute inset-5 rounded-3xl bg-black/10 blur-2xl translate-y-8" />

                <div className="relative rotate-[-5deg] rounded-3xl bg-white p-4 shadow-2xl transition-transform duration-500 hover:rotate-[-2deg] hover:-translate-y-2">

                  {bookOfTheWeek?.imageUrl ? (

                    <img
                      src={bookOfTheWeek.imageUrl}
                      alt={bookOfTheWeek.title}
                      className="h-[390px] w-[270px] rounded-2xl object-cover"
                    />

                  ) : (

                    <div className="flex h-[390px] w-[270px] items-center justify-center rounded-2xl bg-[#f1e6d2]">

                      <BookOpen className="h-16 w-16 text-[#b9680b]/40" />

                    </div>

                  )}

                </div>

            
                <div className="absolute -top-5 -right-8 rotate-6 rounded-2xl bg-[#28251d] px-5 py-4 text-white shadow-xl">

                  <div className="flex items-center gap-1">

                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />

                    <span className="text-sm font-bold">
                      Reader's choice
                    </span>

                  </div>

                </div>

           
                {bookOfTheWeek && (

                  <div className="absolute -bottom-8 -left-10 w-64 rounded-2xl bg-white p-5 shadow-2xl">

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9680b]">
                      Book of the week
                    </p>

                    <p className="mt-2 line-clamp-2 font-serif text-lg font-bold text-[#28251d]">
                      {bookOfTheWeek.title}
                    </p>

                    {bookOfTheWeek.author && (

                      <p className="mt-1 text-sm text-[#837b70]">
                        {bookOfTheWeek.author}
                      </p>

                    )}

                    {bookOfTheWeek.price && (

                      <p className="mt-3 font-bold text-[#b9680b]">
                        ${Number(bookOfTheWeek.price).toFixed(2)}
                      </p>

                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>

   
      <section className="relative overflow-hidden bg-[#f8f5ef] py-24">

     
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e7b45a]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="mb-3 flex items-center gap-3">

                <span className="h-px w-8 bg-[#b9680b]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9680b]">
                  Editor's picks
                </span>

              </div>

              <h2 className="font-serif text-4xl font-bold text-[#28251d] sm:text-5xl">
                New on the shelf
              </h2>

              <p className="mt-4 max-w-lg text-[#746d63]">
                Hand-picked titles our team can't stop talking
                about this month.
              </p>

            </div>

            
            <Link
              to="/books"
              className="group inline-flex items-center gap-2 font-semibold text-[#b9680b] transition hover:text-[#8d4e08]"
            >
              View all books

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </Link>

          </div>

        
          {loading ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="h-96 animate-pulse rounded-3xl bg-white"
                />

              ))}

            </div>

          ) : featured.length === 0 ? (

            <div className="rounded-3xl bg-white py-20 text-center">

              <BookOpen className="mx-auto h-12 w-12 text-[#b9680b]/40" />

              <p className="mt-4 text-[#746d63]">
                No books available yet.
              </p>

            </div>

          ) : (

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

              {featured.map((book) => (

                <div
                  key={book.id}
                  className="transition-all duration-300 hover:-translate-y-2"
                >

                  <BookCard book={book} />

                </div>

              ))}

            </div>

          )}

        </div>

      </section>
    </>
  );
}