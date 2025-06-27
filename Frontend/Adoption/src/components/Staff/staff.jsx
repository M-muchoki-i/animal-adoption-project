import React from "react";
import AnimalList from "./AnimalList"; // Import the component for managing animals
import AdoptionRequests from "./AdoptionRequests"; // Import the component for managing adoption requests
import UserManagement from "./UserManagement"; // Import the component for managing users

const Staff = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Staff Dashboard</h1>
      {/* Render the Animal Management component */}
      <AnimalList />
      {/* Render the Adoption Requests component */}
      <AdoptionRequests />
      {/* Render the User Management component */}
      <UserManagement />
    </div>
  );
};

export default Staff; // Export the Staff component for use in other parts of the application
