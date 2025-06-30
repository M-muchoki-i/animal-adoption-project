import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function AnimalForm({onAnimalAdded}) {
  // const [animals, setAnimals] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/animals")
  //     .then((res) => res.json())
  //     .then((data) => setAnimals(data));
  // }, []);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      species: "",
      age: 0,
      gender: "",
      description: "",
      adoption_status: "",
      health_status: "",
      image: "",
    },
  });

  const onSubmit = (values) => {
    fetch("http://localhost:5000/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Animal added successfully");
        reset();
        if (onAnimalAdded){
          onAnimalAdded(); //Refreshes the animal list
        }
      })
      .catch((err) => {
        toast.error("Failed to add animal")
        console.error(err);
      });
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 mb-8">
      <h2 className="text-3xl font-bold text-green-700 text-center">Add a New Animal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <select
            {...register("gender")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Species</label>
          <input
            type="text"
            {...register("species")}
            placeholder="Species"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Age</label>
          <input
            type="number"
            {...register("age")}
            placeholder="Age"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Adoption Status</label>
          <select
            {...register("adoption_status")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select status --</option>
            <option value="adopted">Adopted</option>
            <option value="pending">Pending</option>
            <option value="unadopted">Unadopted</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Health Status</label>
          <select
            {...register("health_status")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select health --</option>
            <option value="healthy">Healthy</option>
            <option value="unhealthy">Unhealthy</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            rows={3}
            {...register("description")}
            placeholder="Short description"
            className="w-full border px-3 py-2 rounded resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            {...register("image")}
            placeholder="https://example.com/image.jpg"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AnimalForm;