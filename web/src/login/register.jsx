import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://backend-1-61k2.onrender.com/api/register", formData);
            alert(response.data.message);
            navigate("/"); // Redirect to login page after successful registration
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };
    return ( <div className="bg-gray-700 flex min-h-screen">
        {/* Left Section */}
        <div
          className="w-[50%] p-0 bg-gray-700 border-r h-full overflow-y-auto fixed"
          style={{ height: "100vh" }}
        >
          <iframe
            src="/vanta.html"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Vanta Waves Page"
          />
        </div>
  
        {/* Right Section */}
        <div
          className="w-[50%] flex flex-col justify-center items-center p-10 bg-gray-800 text-white"
          style={{ marginLeft: "50%" }}
        >
          {/* Bold Heading */}
          <h1 className="text-4xl font-extrabold mb-6 text-white">Welcome to Job Help</h1>
  
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
          <label className="block text-gray-300 mb-2">Username</label>
          <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:bg-gray-700 autofill:bg-gray-700"
                    required
                />
                 </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:bg-gray-700 autofill:bg-gray-700"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"

                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:bg-gray-700 autofill:bg-gray-700"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
            >
              Sign Up
            </button>
          </form>
  
          {/* Sign Up Link */}
          <p className="mt-6 text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
               Login
            </span>
          </p>
        </div>
      </div>
            
        
    );
};

export default Register;
