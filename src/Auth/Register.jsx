import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "./authService";
import "./Auth.css";
import auth from "../firebase/firebase";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await register(form);

            navigate("/login");
        } catch (err) {
            setMessage(err.message);
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

                <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button>Create Account</button>

                <p>{message}</p>

                <Link to="/login">
                    Already have an account?
                </Link>

            </form>
        </div>
    );
}