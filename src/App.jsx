import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase.jsx";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import AdminDashBoard from "./pages/AdminDashBoaord.jsx";


import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const booksSnapshot = await getDocs(
          collection(db, "books")
        );

        const booksData = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(booksData);

       
        const categoriesSnapshot = await getDocs(
          collection(db, "categories")
        );

        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbeede]">
        <p className="text-xl font-bold">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbeede] text-[#28251d]">
      <NavBar />

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                categories={categories}
              />
            }
          />

          <Route
            path="/books"
            element={
              <BooksPage
                books={books}
                categories={categories}
              />
            }
          />

          <Route
            path="/books/:id"
            element={<BookDetails books={books} />}
          />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />



          <Route
            path="*"
            element={
              <div className="container section">
                <h1>Page not found</h1>
                <p>
                  That page doesn't exist — try the shop instead.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}