import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AnimalList from "./AnimalList"; // Import the AnimalList component

const Staff = () => {
  const { user } = useAuth(); // Retrieve user data from context

  // Check if user is authenticated and has the 'staff' role
  if (!user || user.role !== "staff") {
    return <Redirect to="/" />; // Redirect to home if unauthorized
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Staff Dashboard</h1>
      <AnimalList />{" "}
    </div>
  );
};

export default Staff;
