import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthService.jsx";

export default function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  function handleSubmit(e) {

    e.preventDefault();
    setError("");


    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }


    try {

      register(form);
      navigate("/", { replace: true });

    } catch (err) {

      setError(err.message);

    }

  }
  return (

    <section className="
      min-h-screen
      bg-[#f8f5ef]
      flex
      items-center
      justify-center
      px-6
      py-16
    ">
      <div className="
        max-w-5xl
        w-full
        bg-white
        rounded-2xl
        shadow-xl
        overflow-hidden
        grid
        md:grid-cols-2
      ">
        <div className="
          bg-[#eee6d8]
          p-10
          flex
          flex-col
          justify-center
        ">
          <h1 className="
            text-4xl
            font-serif
            font-bold
            text-gray-900
            mb-5
          ">
            Join BookVerse 📚
          </h1>
          <p className="
            text-gray-600
            leading-relaxed
            mb-8
          ">
            Create your free account and discover thousands of amazing books,
            save your favorites, and enjoy a personalized reading experience.
          </p>
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800"
            alt="Books"
            className="
              rounded-xl
              shadow-lg
              w-full
              h-72
              object-cover
            "
          />
        </div>
        <div className="p-10">
          <span className="
            text-sm
            uppercase
            tracking-widest
            text-yellow-700
            font-semibold
          ">
            Create Account
          </span>
          <h2 className="
            text-4xl
            font-serif
            font-bold
            text-gray-900
            mt-3
            mb-8
          ">
            Welcome!
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
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

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
                w-full
                px-4
                py-3
                border
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-yellow-600"
              required/>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
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

            {error && (

              <p className="text-red-600 text-sm">
                {error}
              </p>

            )}
            <button
              type="submit"
              className="
                w-full
                bg-yellow-700
                text-white
                py-3
                rounded-lg
                font-semibold
                hover:bg-yellow-800
                transition
              "
            >
              Create Account
            </button>



          </form>






          <p className="
            text-center
            text-gray-600
            mt-6
          ">

            Already have an account?

            <Link
              to="/login"
              className="
                ml-2
                text-yellow-700
                font-semibold
                hover:underline
              "
            >
              Sign In
            </Link>

          </p>



        </div>


      </div>


    </section>

  );

}