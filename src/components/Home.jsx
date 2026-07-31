import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomePage from "../pages/HomePage";
import Footer from "../components/Footer";
import AboutPage from "../pages/AboutPage";


export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <HomePage/>
            <Footer/>
            <AboutPage/>


        </>
    );
}