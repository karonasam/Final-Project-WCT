import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../Auth/AuthService.jsx";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("form");
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const [error, setError] = useState("");

  const shipping = subtotal > 40 ? 0 : 4.99;
  const total = subtotal + shipping;



  function update(field, value) {
    setForm((f) => ({
      ...f,
      [field]: value,
    }));
  }
  function validate() {
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      return "Please fill in all shipping fields.";
    }

    if (!/^\d{13,19}$/.test(form.card.replace(/\s/g, ""))) {
      return "Enter a valid card number.";
    }

    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      return "Expiry must be in MM/YY format.";
    }

    if (!/^\d{3,4}$/.test(form.cvc)) {
      return "Enter a valid CVC.";
    }

    return "";
  }
  function handlePay(e) {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStep("processing");


    setTimeout(() => {
      setOrderId(
        "BV-" +
          Math.random()
            .toString(36)
            .slice(2, 9)
            .toUpperCase()
      );

      setStep("success");
      clearCart();

    }, 1400);
  }

  if (items.length === 0 && step === "form") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-serif font-bold mb-6">
          Checkout
        </h1>

        <p className="bg-white rounded-xl shadow p-8 text-gray-600 mb-6">
          Your cart is empty — add a book before checking out.
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
  if (step === "success") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">

        <span className="text-sm uppercase tracking-widest text-yellow-700 font-semibold">
          Payment confirmed
        </span>
        <h1 className="text-5xl font-serif font-bold mt-4 mb-5">
          Thank you, {form.name.split(" ")[0]}.
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Your order <strong>{orderId}</strong> is confirmed.
          A receipt was sent to {form.email}.
        </p>
        <div className="flex gap-4">

          <button
            className="bg-yellow-700 text-white px-6 py-3 rounded-lg hover:bg-yellow-800"
            onClick={() => navigate("/books")}
          >
            Keep browsing
          </button>


          <button
            className="border border-gray-800 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>

        </div>

      </div>
    );
  }
  return (
    <section className="bg-[#f8f5ef] min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-10">
          <form
            onSubmit={handlePay}
            className="lg:col-span-2 bg-white rounded-xl shadow p-8"
          >

            <h1 className="text-5xl font-serif font-bold mb-8">
              Checkout
            </h1>
            <h3 className="text-2xl font-semibold mb-5">
              Shipping details
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mb-10">

              {[
                ["Full name", "name"],
                ["Email", "email"],
                ["Address", "address"],
                ["City", "city"],
                ["ZIP / Postal code", "zip"],
              ].map(([label, field]) => (

                <label
                  key={field}
                  className={field === "address" ? "md:col-span-2" : ""}
                >
                  <span className="block mb-2 text-gray-700">
                    {label}
                  </span>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) => update(field, e.target.value)}
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      rounded-lg
                      outline-none
                      focus:ring-2
                      focus:ring-yellow-600
                    "
                    required
                  />

                </label>

              ))}
            </div>
            <h3 className="text-2xl font-semibold mb-5">
              Payment
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <label className="md:col-span-2">

                <span className="block mb-2">
                  Card number
                </span>

                <input
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={form.card}
                  onChange={(e) => update("card", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </label>
              <label>

                <span className="block mb-2">
                  Expiry (MM/YY)
                </span>

                <input
                  placeholder="12/29"
                  value={form.expiry}
                  onChange={(e) => update("expiry", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />

              </label>
              <label>

                <span className="block mb-2">
                  CVC
                </span>

                <input
                  inputMode="numeric"
                  placeholder="123"
                  value={form.cvc}
                  onChange={(e) => update("cvc", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </label>
            </div>
            {error && (
              <p className="text-red-600 mb-5">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={step === "processing"}
              className="
                w-full
                bg-yellow-700
                text-white
                py-3
                rounded-lg
                hover:bg-yellow-800
              "
            >
              {step === "processing"
                ? "Processing payment..."
                : `Pay $${total.toFixed(2)}`}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              🔒 This is a demo checkout — no real charge is made.
            </p>
          </form>
          <aside className="bg-white rounded-xl shadow p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order summary
            </h2>
            {items.map((i) => (

              <div
                key={i.id}
                className="flex justify-between py-3 border-b"
              >

                <span>
                  {i.title} × {i.qty}
                </span>

                <span>
                  ${(i.price * i.qty).toFixed(2)}
                </span>

              </div>

            ))}
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
            <div className="flex justify-between text-xl font-bold py-5">
              <span>
                Total
              </span>
              <span className="text-yellow-700">
                ${total.toFixed(2)}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}