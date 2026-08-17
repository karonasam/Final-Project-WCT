import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  ShoppingCart,
  Heart,
  Sparkles,
  ArrowRight,
  Library,
  Target,
  Eye,
} from "lucide-react";

/* =========================
   DATA
========================= */

const features = [
  {
    icon: Library,
    title: "Wide Selection",
    description:
      "Explore different genres, authors, and stories all in one place.",
  },
  {
    icon: Search,
    title: "Easy Discovery",
    description:
      "Find your next favorite book with a simple and enjoyable browsing experience.",
  },
  {
    icon: ShoppingCart,
    title: "Simple Shopping",
    description:
      "Add your favorite books to your cart and enjoy a smooth shopping experience.",
  },
  {
    icon: Heart,
    title: "Made for Readers",
    description:
      "BookVerse is designed to make discovering books comfortable and enjoyable.",
  },
];

const genres = [
  {
    name: "Fiction",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Romance",
    image:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mystery",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fantasy",
    image:
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Self Growth",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  },
];

/* =========================
   SCROLL ANIMATION
========================= */

function AnimatedSection({ children }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/* =========================
   ABOUT PAGE
========================= */

export default function AboutPage() {
  return (
    <>
      {/* =========================
          ANIMATIONS
      ========================= */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatBook1 {
          0%,
          100% {
            transform: translateY(0) rotate(-8deg);
          }

          50% {
            transform: translateY(-22px) rotate(-3deg);
          }
        }

        @keyframes floatBook2 {
          0%,
          100% {
            transform: translateY(0) rotate(8deg);
          }

          50% {
            transform: translateY(-28px) rotate(13deg);
          }
        }

        @keyframes floatBook3 {
          0%,
          100% {
            transform: translateY(0) rotate(5deg);
          }

          50% {
            transform: translateY(-18px) rotate(-2deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes slowFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>

      <main className="overflow-hidden bg-[#fff8ed] text-[#3f2a1d]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative min-h-[90vh] overflow-hidden">

          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d99a5b]/10 blur-3xl" />

          <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#8b5e34]/10 blur-3xl" />

          <div className="container relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20">

            <div className="grid w-full items-center gap-14 lg:grid-cols-2">

              {/* TEXT */}

              <div className="relative z-30 text-center lg:text-left">

                <div className="mb-6 inline-flex animate-[fadeDown_0.8s_ease-out] items-center gap-2 rounded-full bg-[#8b5e34]/10 px-4 py-2 text-sm font-semibold text-[#8b5e34]">
                  <Sparkles size={16} />
                  Welcome to BookVerse
                </div>

                <h1 className="animate-[fadeUp_1s_ease-out] text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Discover Your

                  <span className="mt-2 block text-[#a66a35]">
                    Next Favorite Book
                  </span>
                </h1>

                <p className="mx-auto mt-7 max-w-xl animate-[fadeUp_1.2s_ease-out] text-base leading-8 text-[#6f5847] sm:text-lg lg:mx-0">
                  Step into BookVerse, a cozy digital bookstore where stories,
                  adventures, and unforgettable characters are waiting to be
                  discovered.
                </p>

                <p className="mx-auto mt-4 max-w-xl animate-[fadeUp_1.3s_ease-out] text-base leading-8 text-[#6f5847] sm:text-lg lg:mx-0">
                  Whether you love romance, mystery, fantasy, or personal
                  growth, there is always another story waiting for you.
                </p>

                <div className="mt-8 flex animate-[fadeUp_1.5s_ease-out] flex-col justify-center gap-4 sm:flex-row lg:justify-start">

                  <Link
                    to="/books"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#8b5e34] px-7 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#704823] hover:shadow-xl"
                  >
                    Explore Books

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full border border-[#8b5e34]/30 px-7 py-4 font-semibold text-[#8b5e34] transition duration-300 hover:-translate-y-1 hover:bg-[#8b5e34]/10"
                  >
                    Back Home
                  </Link>

                </div>

              </div>

              {/* FLOATING BOOKS */}

              <div className="relative mx-auto h-[430px] w-full max-w-[520px] sm:h-[520px]">

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d99a5b]/20 blur-3xl" />

                {/* MAIN BOOK */}

                <div className="absolute left-1/2 top-1/2 z-10 h-[300px] w-[210px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl animate-[slowFloat_5s_ease-in-out_infinite] sm:h-[390px] sm:w-[270px]">

                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80"
                    alt="Books"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />

                </div>

                {/* BOOK 1 */}

                <div className="absolute left-[2%] top-[10%] z-20 hidden h-36 w-24 overflow-hidden rounded-lg shadow-2xl sm:block animate-[floatBook1_4s_ease-in-out_infinite]">

                  <img
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80"
                    alt="Book"
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* BOOK 2 */}

                <div className="absolute right-[2%] top-[7%] z-20 hidden h-40 w-28 overflow-hidden rounded-lg shadow-2xl sm:block animate-[floatBook2_5s_ease-in-out_infinite]">

                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
                    alt="Book"
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* BOOK 3 */}

                <div className="absolute bottom-[8%] left-[6%] z-20 hidden h-32 w-24 overflow-hidden rounded-lg shadow-2xl sm:block animate-[floatBook3_4.5s_ease-in-out_infinite]">

                  <img
                    src="https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=400&q=80"
                    alt="Book"
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* BOOK 4 */}

                <div className="absolute bottom-[5%] right-[6%] z-20 hidden h-36 w-24 overflow-hidden rounded-lg shadow-2xl sm:block animate-[floatBook1_5s_ease-in-out_infinite]">

                  <img
                    src="https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=400&q=80"
                    alt="Book"
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* STARS */}

                <span className="absolute left-[12%] top-[38%] text-2xl text-[#a66a35] animate-[twinkle_2s_ease-in-out_infinite]">
                  ✦
                </span>

                <span className="absolute right-[10%] top-[48%] text-xl text-[#a66a35] animate-[twinkle_2.5s_ease-in-out_infinite]">
                  ✦
                </span>

                <span className="absolute bottom-[28%] left-[25%] text-lg text-[#a66a35] animate-[twinkle_3s_ease-in-out_infinite]">
                  ✦
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            WHO WE ARE
        ===================================================== */}

        <AnimatedSection>

          <section className="bg-white px-6 py-20">

            <div className="container mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

              <div className="overflow-hidden rounded-[2rem] shadow-lg">

                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80"
                  alt="Bookstore"
                  className="h-[350px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[450px]"
                />

              </div>

              <div>

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66a35]">
                  Who We Are
                </span>

                <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                  A Place Where

                  <span className="block text-[#a66a35]">
                    Stories Come Alive
                  </span>
                </h2>

                <p className="mt-6 leading-8 text-[#6f5847]">
                  BookVerse is an online bookstore created for people who
                  believe that every book has a story worth discovering.
                </p>

                <p className="mt-4 leading-8 text-[#6f5847]">
                  Our goal is to make finding your next book simple,
                  comfortable, and enjoyable.
                </p>

                <div className="mt-8 flex items-center gap-4">

                  <div className="rounded-full bg-[#8b5e34]/10 p-4 text-[#8b5e34]">
                    <BookOpen size={25} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Read. Discover. Explore.
                    </p>

                    <p className="text-sm text-gray-500">
                      Your reading journey starts here.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </AnimatedSection>

        {/* =====================================================
            MISSION
        ===================================================== */}

        <AnimatedSection>

          <section className="px-6 py-20">

            <div className="container mx-auto max-w-5xl text-center">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66a35]">
                Our Mission
              </span>

              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                Making Reading More Accessible
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#6f5847]">
                We want to create a welcoming digital bookstore where readers
                can easily discover books they love.
              </p>

              <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-12">

                <Target
                  size={42}
                  className="mx-auto text-[#8b5e34]"
                />

                <p className="mt-5 text-xl font-medium leading-8 italic text-[#5b4535]">
                  "Every reader deserves to find a story that feels like it
                  was written just for them."
                </p>

              </div>

            </div>

          </section>

        </AnimatedSection>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <AnimatedSection>

          <section className="bg-white px-6 py-20">

            <div className="container mx-auto max-w-7xl">

              <div className="mx-auto max-w-2xl text-center">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66a35]">
                  Why BookVerse?
                </span>

                <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                  Built for Book Lovers
                </h2>

                <p className="mt-5 leading-7 text-[#6f5847]">
                  Everything you need to make discovering your next book
                  easier.
                </p>

              </div>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {features.map((feature) => {

                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="group rounded-3xl border border-[#8b5e34]/10 bg-[#fffaf3] p-7 text-center shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
                    >

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8b5e34]/10 text-[#8b5e34] transition duration-500 group-hover:rotate-6 group-hover:scale-110">

                        <Icon size={28} />

                      </div>

                      <h3 className="mt-6 text-xl font-bold">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#6f5847]">
                        {feature.description}
                      </p>

                    </div>
                  );

                })}

              </div>

            </div>

          </section>

        </AnimatedSection>

        {/* =====================================================
            GENRES
        ===================================================== */}

        <AnimatedSection>

          <section className="px-6 py-20">

            <div className="container mx-auto max-w-7xl">

              <div className="text-center">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66a35]">
                  Explore
                </span>

                <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                  Something for Every Reader
                </h2>

              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

                {genres.map((genre) => (

                  <Link
                    key={genre.name}
                    to="/books"
                    className="group relative h-48 overflow-hidden rounded-2xl shadow-md sm:h-56"
                  >

                    <img
                      src={genre.image}
                      alt={genre.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/35 transition duration-500 group-hover:bg-black/50" />

                    <div className="absolute inset-0 flex items-center justify-center p-3 text-center">

                      <h3 className="text-lg font-bold text-white drop-shadow-lg">
                        {genre.name}
                      </h3>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </section>

        </AnimatedSection>

        {/* =====================================================
            VISION
        ===================================================== */}

        <AnimatedSection>

          <section className="bg-[#3f2a1d] px-6 py-20 text-white">

            <div className="container mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

              <div>

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#e0ae77]">
                  Our Vision
                </span>

                <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                  A World Full of Stories
                </h2>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

                <Eye
                  size={38}
                  className="text-[#e0ae77]"
                />

                <p className="mt-5 text-lg leading-8 text-white/80">
                  We envision BookVerse becoming a welcoming digital space
                  where every reader can discover a story worth remembering.
                </p>

              </div>

            </div>

          </section>

        </AnimatedSection>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="relative overflow-hidden px-6 py-24 text-center">

          <div className="absolute inset-0 bg-[#d99a5b]/10" />

          <div className="relative mx-auto max-w-3xl">

            <Sparkles
              size={35}
              className="mx-auto text-[#a66a35]"
            />

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              Ready to Find Your Next Book?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-[#6f5847]">
              Your next adventure, lesson, or unforgettable story could be
              just one click away.
            </p>

            <Link
              to="/books"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#8b5e34] px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#704823] hover:shadow-xl"
            >
              Browse Books

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}