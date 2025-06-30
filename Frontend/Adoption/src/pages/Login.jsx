import{ useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:5000";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      setMessage(null);

      try {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage({ type: "success", text: "Login successful!" });
          // TODO: Handle storing auth token or redirecting user
        } else {
          setMessage({ type: "error", text: data.error || "Login failed" });
        }
      } catch (error) {
        setMessage({ type: "error", text: "Network error" });
      }
    };
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Welcome back !</h2>
          <p className="text-sm text-gray-500">
            Enter to get unlimited access to data & information.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your mail address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:green-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                required
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to={"/user"} className="text-green-600 font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
      


