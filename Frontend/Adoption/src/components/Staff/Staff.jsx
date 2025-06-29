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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Staff Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
      <AnimalList />{" "}
      <CreateAdoptionForm/> {""}
      <User/>
      </div>
    </div>
  );
};

export default Staff;
