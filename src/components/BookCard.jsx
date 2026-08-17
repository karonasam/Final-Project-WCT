import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";

export default function BookCard({ book }) {
  const { addItem } = useCart();


  const handleAddToCart = () => {
    addItem(book);
  };

  const imageUrl =
    book.imageUrl ||
    book.image ||
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="group rounded-[28px] border border-[#e8dcc8] bg-[#fbeede] p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

  
      <div className="flex h-[250px] items-center justify-center overflow-hidden rounded-[22px] bg-[#f3e3cb]">
        <img
          src={imageUrl}
          alt={book.title || "Book cover"}
          className="h-[220px] w-[150px] rounded-md object-cover shadow-xl transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";
          }}
        />
      </div>

  
    <div className="mt-5">
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

  <div className="mt-4 flex items-center justify-between">
    {/* <span className="text-lg font-bold text-[#a56519]">
      ${Number(book.price || 0).toFixed(2)}
    </span> */}

 

        </div>
      </div>
    </div>
  );
}