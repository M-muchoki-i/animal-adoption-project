import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AnimalList from "./AnimalList"; // Import the AnimalList component
import User from "../../pages/User";
import CreateAdoptionForm from "../../pages/AdoptionRequest";

const Staff = () => {
  const { user } = useAuth(); // Retrieve user data from context

  // Check if user is authenticated and has the 'staff' role
  if (!user || user.role !== "staff") {
    return <Navigate to="/" />; // Redirect to home if unauthorized
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Staff Dashboard</h1>
      <AnimalList />{" "}
      <CreateAdoptionForm/> {""}
      <User/>

    </div>
  );
};

export default Staff;
