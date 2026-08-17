import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthService.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";


export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const redirectTo = location.state?.from || "/";


  async function handleSubmit(e) {

    e.preventDefault();
    setError("");

    try {


    
      const user = await login(form);

      console.log("Logged in UID:", user.uid);

      const adminRef = doc(db, "admins", user.uid);

      const adminSnap = await getDoc(adminRef);


      if (adminSnap.exists()) {

        console.log("Admin login");
        navigate("/admin");

      } else {

        console.log("Normal user login");
        navigate(redirectTo, { replace: true });

      }


    } catch (err) {

      console.error(err);
      setError(err.message);

    }
  }


  return (
    <div className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-6 py-16">

      <div className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-xl
        p-8
      ">
        <span className="text-sm uppercase tracking-widest text-yellow-700 font-semibold">
          Welcome back
        </span>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mt-3 mb-4">
          Sign in
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to check out faster and track your orders.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <label className="block">

            <span className="block text-gray-700 mb-2">
              Email
            </span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="you@example.com"
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
            />
          </label>
          <label className="block">

            <span className="block text-gray-700 mb-2">
              Password
            </span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              placeholder="••••••••"
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
            />

          </label>
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
              transition">
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          New to Bookverse?
          <Link
            to="/register"
            className="ml-2 text-yellow-700 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}