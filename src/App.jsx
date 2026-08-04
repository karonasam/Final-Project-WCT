import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import BookPage from './pages/BooksPage.jsx'
import BookDetails from './pages/BookDetails.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import Login from './Auth/Login.jsx'
import Register from './Auth/Register.jsx'
import './App.css'
import AdminDashBoard from './pages/AdminDashBoaord.jsx'

export default function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="admin" element={<AdminDashBoard />} />
          <Route
            path="*"
            element={
              <div className="container section">
                <h1>Page not found</h1>
                <p>That page doesn't exist — try the shop instead.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}