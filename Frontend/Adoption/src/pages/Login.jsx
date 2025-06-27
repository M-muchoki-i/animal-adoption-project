import React, { useState } from "react";

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
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.type === "error"
                  ? "bg-red-200 text-red-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </>
    );
}


export default Login;
