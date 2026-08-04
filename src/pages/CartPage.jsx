import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  const navigate = useNavigate();

  const shipping = items.length === 0 ? 0 : subtotal > 40 ? 0 : 4.99;
  const total = subtotal + shipping;



  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
          Your cart
        </h1>

        <p className="bg-white rounded-xl shadow p-8 text-gray-600 mb-6">
          Your cart is empty. Time to find something good.
        </p>

        <Link
          to="/books"
          className="inline-block bg-yellow-700 text-white px-8 py-3 rounded-lg hover:bg-yellow-800 transition"
        >
          Browse books
        </Link>

      </div>
    );
  }



  return (
    <section className="bg-[#f8f5ef] min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">

            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-8">
              Your cart
            </h1>


            <div className="space-y-5">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-xl
                    shadow
                    p-5
                    flex
                    items-center
                    gap-5
                  "
                >
                  <div
                    className="w-16 h-24 rounded-lg shrink-0"
                    style={{ background: item.spine }}
                  />
                  <div className="flex-1">

                    <Link
                      to={`/books/${item.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-yellow-700"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-600 mt-1">
                      {item.author}
                    </p>
                    <button
                      className="text-red-600 text-sm mt-3 hover:underline"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>

                  </div>
                  <div className="flex items-center border rounded-lg overflow-hidden">

                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-2 hover:bg-gray-100 text-xl"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-4 font-semibold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-2 hover:bg-gray-100 text-xl"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>
                  <div className="font-bold text-lg text-yellow-700">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>


                </div>

              ))}

            </div>

          </div>

          <aside className="bg-white rounded-xl shadow p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order summary
            </h2>
            <div className="flex justify-between py-3 border-b">
              <span>
                Subtotal
              </span>
              <span>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span>
                Shipping
              </span>

              <span>
                {shipping === 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-sm text-gray-500 mt-4">
                Free shipping on orders over $40.
              </p>
            )}
            <div className="flex justify-between text-xl font-bold py-5">
              <span>
                Total
              </span>

              <span className="text-yellow-700">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              className="
                w-full
                bg-yellow-700
                text-white
                py-3
                rounded-lg
                hover:bg-yellow-800
                transition
              "
              onClick={() => navigate("/checkout")}
            >
              Proceed to checkout
            </button>
            <Link
              to="/books"
              className="block text-center mt-5 text-gray-600 hover:text-yellow-700"
            >
              ← Continue shopping
            </Link>
          </aside>
        </div>
      </div>

    </section>
  );
}