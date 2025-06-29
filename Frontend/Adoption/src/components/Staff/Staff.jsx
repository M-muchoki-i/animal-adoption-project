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
      {/* Change layout to be side to side */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage animals */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Manage Animals</h2>
      <AnimalList />{" "}
      </div>
      {/* Adoption Form */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Adoption Requests</h2>
      <CreateAdoptionForm/> {""}
      </div>
      {/* Users Infos */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">User Info</h2>
      </div>
      <User/>
      </div>
    </div>
  );
};

export default Staff;
