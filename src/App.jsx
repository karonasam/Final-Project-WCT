import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailPage";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
    return (
        <>
            <Navbar/>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/books" element={<BooksPage/>}/>
                <Route path="/books/:id" element={<BookDetailsPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>

            <Footer/>
        </>
    );
}

export default App;