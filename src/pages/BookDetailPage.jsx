import React from "react";
import {useParams, Link} from "react-router-dom";
import {Star, ArrowLeft, ShoppingCart} from "lucide-react";

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        price: "$25",
        rating: 4.5,
        category: "Self Help",
        image:
            "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        description:
            "Atomic Habits provides practical strategies to build good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    },

    {
        id: 2,
        title: "Deep Work",
        author: "Cal Newport",
        price: "$22",
        rating: 3,
        category: "Productivity",
        image:
            "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
        description:
            "Deep Work explains how focused work can help you achieve meaningful success in a distracted world.",
    },

    {
        id: 3,
        title: "Ikigai",
        author: "Hector Garcia",
        price: "$20",
        rating: 4.5,
        category: "Lifestyle",
        image:
            "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
        description:
            "Ikigai explores the Japanese concept of finding purpose and happiness in everyday life.",
    },
    {
        id: 4,
        title: "Psychology of Money",
        author: "Morgan Housel",
        price: "$28",
        rating: 5,
        category: "Finance",
        image:
            "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
        description:
            "Psychology of Money explores the behavioral and emotional aspects of financial decision-making.",
    },
    {
        id: 5,
        title: "Broke on Monday, Boss by Friday",
        author: "Morgan Housel",
        price: "$28",
        rating: 3,
        category: "Finance",
        image:
            "https://i.pinimg.com/736x/9e/4d/e9/9e4de970ae212592058ac4bd148aaa7a.jpg",
        description:
            "Broke on Monday, Boss by Friday explores the psychological and emotional aspects of financial decision-making.",
    },
    {
        id: 6,
        title: "Lock Every Door",
        author: "Morgan Housel",
        price: "$28",
        rating: 5,
        category: "Finance",
        image:
            "https://i.pinimg.com/1200x/8a/a4/e6/8aa4e6eff87685572f47aa636d75ef80.jpg",
        description:
            "Lock Every Door is a gripping thriller that keeps readers on the edge of their seats.",
    },
    {
        id: 7,
        title: "To the man I loved too much",
        author: "Morgan Housel",
        price: "$30",
        rating: 4.5,
        category: "Romance",
        image:
            "https://i.pinimg.com/736x/b2/4d/68/b24d68b440bed440eb15e7173353a314.jpg",
        description:
            "To the man I loved too much is a deeply emotional story about love, loss, and the complexities of human relationships.",
    },
    {
        id: 8,
        title: "Feminine energy",
        author: "Morgan Housel",
        price: "$17",
        rating: 3.5,
        category: "Romance",
        image:
            "https://i.pinimg.com/736x/01/4e/a3/014ea34e9d715aea48f464046eee9e6f.jpg",
        description:
            "Feminine energy explores the power and influence of feminine energy in personal and professional life.",
    },
    {
        id: 9,
        title: "Ego is the Enemy",
        author: "Morgan Housel",
        price: "$12",
        rating: 3,
        category: "Self Help",
        image:
            "https://i.pinimg.com/736x/01/4e/a3/014ea34e9d715aea48f464046eee9e6f.jpg",
        description:
            "Ego is the Enemy explores the harmful effects of ego and how to overcome it.",
    },
    {
        id: 10,
        title: "Power",
        author: "Morgan Housel",
        price: "$12",
        rating: 4,
        category: "Self Help",
        image:
            "https://i.pinimg.com/736x/01/4e/a3/014ea34e9d715aea48f464046eee9e6f.jpg",
        description:
            "Power explores the dynamics of influence and control in personal and professional life.",
    },
];


export default function BookDetailsPage() {

    const {id} = useParams();

    const book = books.find(
        (book) => book.id === Number(id)
    );


    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Book Not Found
                </h1>
            </div>
        );
    }


    return (
        <section className="min-h-screen bg-[#faf7f1] py-20">

            <div className="max-w-6xl mx-auto px-6">


                {/* Back Button */}
                <Link
                    to="/books"
                    className="flex items-center gap-2 text-orange-500 mb-8"
                >
                    <ArrowLeft size={20}/>
                    Back to Books
                </Link>


                <div className="bg-white rounded-3xl shadow-lg p-8 grid md:grid-cols-2 gap-10">


                    {/* Book Image */}
                    <div className="flex justify-center">

                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-80 h-[450px] object-cover rounded-2xl shadow"
                        />

                    </div>


                    {/* Book Information */}
                    <div>

                        <h1 className="text-5xl font-serif font-bold text-stone-800">
                            {book.title}
                        </h1>


                        <p className="text-stone-500 text-lg mt-3">
                            By {book.author}
                        </p>


                        <div className="flex items-center gap-1 mt-5">

                            {[...Array(book.rating)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={22}
                                    className="fill-yellow-400 text-yellow-400"
                                />
                            ))}

                        </div>


                        <p className="mt-6 text-stone-600 leading-7">
                            {book.description}
                        </p>


                        <div className="mt-6">

              <span className="text-sm text-stone-500">
                Category
              </span>

                            <p className="font-semibold text-orange-500">
                                {book.category}
                            </p>

                        </div>


                        <div className="flex items-center justify-between mt-10">


                            <h2 className="text-4xl font-bold text-orange-500">
                                {book.price}
                            </h2>


                        </div>


                    </div>

                </div>

            </div>
        
        </section>
        
        
    );
}