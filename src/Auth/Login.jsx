import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "./authService";
import "./Auth.css";
import auth from "../firebase/firebase";
export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await login(form);

            localStorage.setItem("user", JSON.stringify(data));

            navigate("/");
        } catch (err) {
            setMessage(err.message);
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-card">

                <h2>Login</h2>

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

                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p>{message}</p>

                <Link to="/register">
                    Create account
                </Link>

            </form>
        </div>
    );
}