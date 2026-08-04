import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

        <div>
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white">
              B
            </span>
            BookVerse
          </Link>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            Discover timeless stories, inspiring authors, and carefully
            selected books chosen for every reader.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="hover:text-amber-400 transition"
            >
              Facebook
            </a>

            <a
              href="#"
              className="hover:text-amber-400 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:text-amber-400 transition"
            >
              Twitter
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Shop
          </h4>

          <div className="flex flex-col gap-3">
            <Link to="/books" className="hover:text-amber-400 transition">
              All Books
            </Link>

            <Link to="/cart" className="hover:text-amber-400 transition">
              Shopping Cart
            </Link>

            <Link to="/checkout" className="hover:text-amber-400 transition">
              Checkout
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Company
          </h4>

          <div className="flex flex-col gap-3">
            <Link to="/about" className="hover:text-amber-400 transition">
              About Us
            </Link>

            <a
              href="mailto:hello@bookverse.example"
              className="hover:text-amber-400 transition"
            >
              Contact
            </a>

            <a href="#" className="hover:text-amber-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-amber-400 transition">
              Terms & Conditions
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Account
          </h4>

          <div className="flex flex-col gap-3">
            <Link to="/login" className="hover:text-amber-400 transition">
              Sign In
            </Link>

            <Link to="/register" className="hover:text-amber-400 transition">
              Create Account
            </Link>

            <Link to="/cart" className="hover:text-amber-400 transition">
              My Cart
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <span>
            © {new Date().getFullYear()} BookVerse. All rights reserved.
          </span>

          <span className="mt-2 md:mt-0">
            Made with ❤️ for book lovers
          </span>
        </div>
      </div>
    </footer>
  );
}