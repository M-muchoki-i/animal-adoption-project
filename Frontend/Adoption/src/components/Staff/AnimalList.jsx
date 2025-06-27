import React, { useEffect, useState } from "react"; 
import { useForm } from "react-hook-form"; 

const AnimalList = () => {
  const [animals, setAnimals] = useState([]); // State to hold the list of animals
  const { register, handleSubmit, reset } = useForm(); // Initialize form handling

  // Fetch animals from our backend
  useEffect(() => {
    fetch("http://localhost:5555/animals")
      .then((res) => res.json())
      .then((data) => setAnimals(data)); 
  }, []);

  // Function to handle form submission for adding a new animal
  const onSubmit = (data) => {
    fetch("http://localhost:5000/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Send the new animal data as JSON
    }).then(() => {
      reset(); // Reset the form fields after submission
      fetchAnimals(); // Refresh the list of animals
    });
  };

  // Function to fetch the updated list of animals
  const fetchAnimals = () => {
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => setAnimals(data)); // Update state with new data
  };

  return (
    <div>
      <h2>Manage Animals</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields for animal data */}
        <input {...register("name")} placeholder="Name" />
        <button type="submit">Add Animal</button>
      </form>
      <ul>
        {/* List all animals */}
        {animals.map((animal) => (
          <li key={animal.id}>{animal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalList; // Export the AnimalList component for use in the Staff component
