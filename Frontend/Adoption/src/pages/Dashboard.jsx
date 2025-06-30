import React, { useState } from "react";
import Login from "../pages/Login";
import User from "../pages/User"; // Signup form

function Dashboard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-white">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
            Welcome to the Animal Adoption Dashboard
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Manage adoptions, animals, and more.
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-l-lg font-medium ${
                isLogin
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-r-lg font-medium ${
                !isLogin
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="transition-all duration-300">
            {isLogin ? <Login /> : <User />}
          </div>
        </div>
      </main>

      {/* Optional Footer */}
      <footer className="text-center p-4 text-sm text-gray-500">
        © 2025 Animal Adoption Center. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
