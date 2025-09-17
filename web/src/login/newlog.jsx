import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../login/usercontext";
import { jwtDecode } from "jwt-decode";

const VantaPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-1-61k2.onrender.com/api/login", formData);
      const token = response.data.token;
      const decoded = jwtDecode(token);
      login(decoded.id);
      alert(response.data.message);
      navigate("/home2");
    } catch (err) {
      if (err.response?.status === 404) {
        alert("User not found. Redirecting to registration.");
        navigate("/register");
      } else {
        setError("Invalid credentials. Try again");
      }
    }
  };

  return (
    <div className="bg-gray-700 flex min-h-screen">
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
        <h1 className="text-4xl font-extrabold mb-6 text-white">Welcome to EliteResume AI</h1>

        <h2 className="text-3xl font-bold mb-6 text-blue-400">Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="you@gmail.com"
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
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-gray-300">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default VantaPage;
