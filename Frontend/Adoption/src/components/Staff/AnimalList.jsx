import React, { useEffect, useState } from "react"; 
import { useForm } from "react-hook-form"; 
import { Link } from 'react-router-dom';


const AnimalList = () => {
  const [animals, setAnimals] = useState([]); // State to hold the list of animals
  const { register, handleSubmit, reset } = useForm(); // Initialize form handling


  // Fetch animals from our backend
  useEffect(() => {
    fetchAnimals();
  }, []);

  // Then the below we have a function to fetch the updated list of animals
  const fetchAnimals = () => {
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
      console.log(data); // Update state with new data
  })
  .catch((error) => console.error('Error fetching animals:', error));
};

  // Function to handle form submission for adding a new animal
  const onSubmit = (data) => {
    fetch("http://localhost:5000/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Send the new animal data as JSON
    }).then(() => {
      reset(); // Reset the form fields after submission
      fetchAnimals(); // Refresh the list of animals
    }).catch((error) => console.error('Error adding animal:', error));
  };

  // add delete to be able to delete an animal from the list

  const deleteAnimal = (id) => {
    console.log("Deleting animal with id:", id);
    fetch(`http://localhost:5000/animals/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchAnimals(); // Refresh the list after deletion
    });
  };


  return (
    <div className= "p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Animals</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        {/* Form fields for animal data */}
        <input {...register("name")} 
        placeholder="Name" 
        className="p-2 border border-gray-300 rounded mr-2" />
        <button type="submit" 
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Animal
          </button>
      </form>
      <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">Our Furry Friends</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
      {animals.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No animals found.</p>
        ) : (
        animals.map((animal) => (
          <div key={animal.id} className="flex flex-col items-center">
          <Link to={`/animals/${animal.id}`}>
            <div className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transform transition duration-300 w-72">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{animal.name}</h3>
                <p className="text-base text-black">Age: {animal.age}</p>
              </div>
            </div>
          </Link>
          <button 
          onClick={() => deleteAnimal(animal.id)} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
        ))
    )}
      </section>
    </div>
  );
};


export default AnimalList; // Export the AnimalList component for use in the Staff component
