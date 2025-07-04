// src/components/Header.jsx
// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";


const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="paw">
            🐾
          </span>
          <Link to="/">Animal Adoption</Link>
        </h1>

        <nav className="space-x-4">
          {/* <Link to="/">Home</Link> */}

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              {/* <Link to="/staff/signup">Staff Signup</Link> */}
            </>
          ) : (

              
              

            <>
              <Link to={"/home"}>Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/animals">Animals</Link>
              {/* <Link to="/adopt">Adopt</Link> */}
              <Link to="/staff">Staff</Link>
              {/* Ensure only staff can see staff on the Header
              
              {user.role === "staff" && <Link to="/staff">Staff</Link>} */}
              <Link to="/testimonials">Testimonials</Link>
              <Link to="/adoptions">Track Adoptions</Link>

              {/* <Link to="/update_animal">Update Animal</Link> */}
              <button onClick={logout} className="ml-4 underline">Logout</button>
              

            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
