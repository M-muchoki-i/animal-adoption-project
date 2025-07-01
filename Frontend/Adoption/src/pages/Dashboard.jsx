import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-white">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
            Welcome to the Animal Adoption Dashboard
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Join our compassionate community and help animals find loving homes.
            Whether you're here to adopt, volunteer, or donate—you're in the
            right place.
          </p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/login">
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white border border-green-700 text-green-700 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-100 transition-transform hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Motivation Text */}
          <div className="mt-8 text-center text-gray-700">
            <p className="mb-2">🐾 Give a pet a second chance.</p>
            <p className="mb-2">💚 Become part of our life-saving mission.</p>
            <p>🌟 Start your journey with us today!</p>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500">
        © 2025 Animal Adoption Center. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
