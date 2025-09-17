import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../login/usercontext";
import { jwtDecode } from "jwt-decode";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useUser(); // Access the login function from context
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://backend-1-61k2.onrender.com/api/login", formData);
            const token = response.data.token;
            const decoded = jwtDecode(token); // Decode JWT to extract user ID
            login(decoded.id); // Update UserContext with the user ID
            alert(response.data.message);
            // You can save the token in localStorage if needed
            // localStorage.setItem("token", response.data.token);
            navigate("/home2")
        } catch (err) {
            if (err.response?.status === 404) {
                alert("User not found. Redirecting to registration.");
                navigate("/register"); // Redirect to the registration page
            }else {
                setError("Invalid credentials. Try again");
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};
export default Login;
