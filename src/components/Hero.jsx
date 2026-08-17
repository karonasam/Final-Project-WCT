import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Star,
} from "lucide-react";

const heroBooks = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=85",
    title: "Adventure",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=85",
    title: "Mystery",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=85",
    title: "Fantasy",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&q=85",
    title: "Romance",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=85",
    title: "Classics",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=85",
    title: "Stories",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=85",
    title: "Literature",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fff9ef] text-[#2f2119]">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#ead7bc]/30 blur-3xl" />

        <div className="absolute -left-40 top-1/2 h-[350px] w-[350px] rounded-full bg-[#d9b98f]/15 blur-3xl animate-[blob_10s_ease-in-out_infinite]" />

        <div className="absolute -right-40 top-1/3 h-[350px] w-[350px] rounded-full bg-[#d9b98f]/15 blur-3xl animate-[blob2_12s_ease-in-out_infinite]" />

      </div>

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 pt-20 sm:px-8 sm:pt-24">

        {/* =========================================
            HEADING
        ========================================= */}

        <div className="mx-auto max-w-4xl text-center">

          {/* Small label */}

          <div className="mb-5 animate-[fadeDown_0.8s_ease-out]">

            <span className="font-serif text-2xl italic text-[#8b5e34] sm:text-3xl">
              Discover your next story,
            </span>

          </div>

          {/* Main heading */}

          <h1 className="animate-[heroTitle_1s_ease-out] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#211711] sm:text-6xl md:text-7xl lg:text-[6.5rem]">

            Find Books.
            <span className="block">
              Find Your World.
            </span>

          </h1>

          {/* Description */}

          <p className="mx-auto mt-7 max-w-2xl animate-[fadeUp_1.2s_ease-out] text-base leading-7 text-[#76685d] sm:text-lg">

            Explore stories that inspire, entertain, and take you
            somewhere new. Your next favorite book is waiting.

          </p>

          {/* Button */}

          <div className="mt-7 animate-[fadeUp_1.4s_ease-out]">

            <Link
              to="/books"
              className="group inline-flex items-center gap-3 rounded-full bg-[#211711] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#8b5e34] hover:shadow-xl"
            >

              Explore Books

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </span>

            </Link>

          </div>

        </div>

        {/* =========================================
            BOOK CAROUSEL
        ========================================= */}

        <div className="relative mt-16 h-[390px] w-full overflow-visible sm:mt-20 sm:h-[470px]">

          {/* Curved background */}

          <div className="absolute bottom-[10%] left-1/2 h-[280px] w-[1000px] -translate-x-1/2 rounded-[50%] border-t border-[#8b5e34]/10 sm:h-[350px] sm:w-[1300px]" />

          {/* Soft floor shadow */}

          <div className="absolute bottom-[12%] left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-full bg-[#8b5e34]/10 blur-3xl" />

          {/* =====================================
              BOOKS
          ===================================== */}

          <div className="book-carousel">

            {heroBooks.map((book, index) => (
              <div
                key={book.id}
                className="hero-book"
                style={{
                  animationDelay: `${index * -1.4}s`,
                }}
              >

                <div className="book-card">

                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =========================================
            FEATURES
        ========================================= */}

        <div className="mx-auto mt-3 grid max-w-5xl border-t border-[#8b5e34]/15 pb-16 pt-8 sm:grid-cols-3">

          {/* Feature 1 */}

          <div className="px-6 py-4 text-center sm:border-r sm:border-[#8b5e34]/15">

            <BookOpen
              size={21}
              className="mx-auto mb-3 text-[#8b5e34]"
            />

            <h3 className="font-semibold text-[#2f2119]">
              Endless Stories
            </h3>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#76685d]">
              Explore books across different genres and worlds.
            </p>

          </div>

          {/* Feature 2 */}

          <div className="px-6 py-4 text-center sm:border-r sm:border-[#8b5e34]/15">

            <Star
              size={21}
              className="mx-auto mb-3 fill-[#b67b45] text-[#b67b45]"
            />

            <h3 className="font-semibold text-[#2f2119]">
              Handpicked Books
            </h3>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#76685d]">
              Discover stories selected for every kind of reader.
            </p>

          </div>

          {/* Feature 3 */}

          <div className="px-6 py-4 text-center">

            <div className="mx-auto mb-3 flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#8b5e34] text-[10px] font-bold text-white">
              4.9
            </div>

            <h3 className="font-semibold text-[#2f2119]">
              Loved by Readers
            </h3>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#76685d]">
              Find books that readers keep coming back to.
            </p>

          </div>

        </div>

      </div>

      {/* =========================================
          ANIMATIONS
      ========================================= */}

      <style>{`

        /* ========================================
           BOOK CAROUSEL
        ======================================== */

        .book-carousel {
          position: absolute;
          inset: 0;
          overflow: visible;
        }

        .hero-book {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 170px;
          height: 255px;

          margin-left: -85px;
          margin-top: -127px;

          animation-name: bookCarousel;
          animation-duration: 9.8s;
          animation-timing-function: cubic-bezier(
            0.45,
            0,
            0.55,
            1
          );
          animation-iteration-count: infinite;

          will-change: transform, opacity;
        }

        .book-card {
          position: relative;

          width: 100%;
          height: 100%;

          overflow: hidden;

          border-radius: 12px;

          background: white;

          border: 1px solid rgba(80,50,30,0.08);

          box-shadow:
            0 25px 50px rgba(72,45,28,0.16);

          transition:
            box-shadow 0.4s ease,
            transform 0.4s ease;
        }

        /* ========================================
           MAIN BOOK JOURNEY
        ======================================== */

        @keyframes bookCarousel {

          /* FAR LEFT */

          0% {
            opacity: 0;

            transform:
              translateX(-650px)
              translateY(85px)
              scale(0.62)
              rotate(-10deg);

            z-index: 1;
          }

          /* LEFT EDGE */

          10% {
            opacity: 0.75;

            transform:
              translateX(-520px)
              translateY(55px)
              scale(0.72)
              rotate(-8deg);

            z-index: 2;
          }

          /* LEFT */

          22% {
            opacity: 1;

            transform:
              translateX(-360px)
              translateY(20px)
              scale(0.84)
              rotate(-6deg);

            z-index: 3;
          }

          /* LEFT CENTER */

          35% {
            opacity: 1;

            transform:
              translateX(-190px)
              translateY(-5px)
              scale(0.94)
              rotate(-3deg);

            z-index: 5;
          }

          /* =================================
             CENTER / FEATURED BOOK
          ================================= */

          50% {
            opacity: 1;

            transform:
              translateX(0)
              translateY(-35px)
              scale(1.18)
              rotate(0deg);

            z-index: 20;

            filter:
              drop-shadow(
                0 35px 30px
                rgba(70,40,20,0.25)
              );
          }

          /* RIGHT CENTER */

          65% {
            opacity: 1;

            transform:
              translateX(190px)
              translateY(-5px)
              scale(0.94)
              rotate(3deg);

            z-index: 5;
          }

          /* RIGHT */

          78% {
            opacity: 1;

            transform:
              translateX(360px)
              translateY(20px)
              scale(0.84)
              rotate(6deg);

            z-index: 3;
          }

          /* RIGHT EDGE */

          90% {
            opacity: 0.7;

            transform:
              translateX(520px)
              translateY(55px)
              scale(0.72)
              rotate(8deg);

            z-index: 2;
          }

          /* FAR RIGHT */

          100% {
            opacity: 0;

            transform:
              translateX(650px)
              translateY(85px)
              scale(0.62)
              rotate(10deg);

            z-index: 1;
          }

        }

        /* ========================================
           HEADING
        ======================================== */

        @keyframes heroTitle {

          from {
            opacity: 0;
            transform:
              translateY(35px)
              scale(0.96);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter: blur(0);
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

        @keyframes fadeDown {

          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        /* ========================================
           BACKGROUND
        ======================================== */

        @keyframes blob {

          0%, 100% {
            transform:
              translate(0, 0)
              scale(1);
          }

          50% {
            transform:
              translate(50px, -30px)
              scale(1.15);
          }

        }

        @keyframes blob2 {

          0%, 100% {
            transform:
              translate(0, 0)
              scale(1);
          }

          50% {
            transform:
              translate(-50px, 30px)
              scale(1.15);
          }

        }

        /* ========================================
           TABLET
        ======================================== */

        @media (max-width: 1024px) {

          .hero-book {
            width: 140px;
            height: 215px;

            margin-left: -70px;
            margin-top: -107px;
          }

          @keyframes bookCarousel {

            0% {
              opacity: 0;
              transform:
                translateX(-500px)
                translateY(70px)
                scale(0.55)
                rotate(-10deg);
            }

            20% {
              opacity: 1;
              transform:
                translateX(-280px)
                translateY(20px)
                scale(0.75)
                rotate(-6deg);
            }

            50% {
              opacity: 1;
              transform:
                translateX(0)
                translateY(-25px)
                scale(1.08)
                rotate(0);
            }

            80% {
              opacity: 1;
              transform:
                translateX(280px)
                translateY(20px)
                scale(0.75)
                rotate(6deg);
            }

            100% {
              opacity: 0;
              transform:
                translateX(500px)
                translateY(70px)
                scale(0.55)
                rotate(10deg);
            }

          }

        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 640px) {

          .hero-book {
            width: 105px;
            height: 160px;

            margin-left: -52px;
            margin-top: -80px;
          }

          @keyframes bookCarousel {

            0% {
              opacity: 0;

              transform:
                translateX(-280px)
                translateY(45px)
                scale(0.5)
                rotate(-10deg);
            }

            20% {
              opacity: 1;

              transform:
                translateX(-170px)
                translateY(20px)
                scale(0.65)
                rotate(-7deg);
            }

            50% {
              opacity: 1;

              transform:
                translateX(0)
                translateY(-20px)
                scale(1)
                rotate(0);
            }

            80% {
              opacity: 1;

              transform:
                translateX(170px)
                translateY(20px)
                scale(0.65)
                rotate(7deg);
            }

            100% {
              opacity: 0;

              transform:
                translateX(280px)
                translateY(45px)
                scale(0.5)
                rotate(10deg);
            }

          }

        }

        /* ========================================
           REDUCED MOTION
        ======================================== */

        @media (prefers-reduced-motion: reduce) {

          .hero-book,
          .animate-pulse,
          .animate-ping {
            animation: none !important;
          }

        }

      `}</style>

    </section>
  );
}