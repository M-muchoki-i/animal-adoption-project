import React, { createContext, useContext, useState } from "react";

// Context for the authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user information

  // Function to log in the user and store their data
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Store token in local storage
    localStorage.setItem("role", userData.role); // Store user role in local storage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear user data from state
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("role"); // Remove role from local storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
