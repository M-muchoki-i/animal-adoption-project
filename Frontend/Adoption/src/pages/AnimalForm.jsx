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
    <>
      <main>
        <div className="bg-white text-black p-6 rounded-lg max-w-3xl border-2 border-green-700 shadow-md hover:shadow-2xl transition-shadow mx-auto mt-7 mb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">Add a animal</h2>

            <div className="mb-4">
              <label className="block text-sm mb-1">Animal_name</label>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <div className="mb-4">
                <label className="block text-sm mb-1">Gender</label>
                <select
                  {...register("gender")}
                  className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white"
                >
                  <option value="">-- Select gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Species</label>
              <input
                type="text"
                placeholder="Species"
                className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white"
                {...register("species")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Age</label>
              <input
                placeholder="age"
                className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white"
                {...register("age")}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">adoption_status</label>
              <select
                {...register("adoption_status")}
                className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white"
              >
                <option value="">-- Select status --</option>
                <option value="adopted">Adopted</option>
                <option value="pending">Pending</option>
                <option value="unadopted">Unadopted</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                placeholder="Enter a short description"
                className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white resize-none"
                rows={4}
                {...register("description")}
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block text-sm mb-1">health_status</label>
              <select
                {...register("health_status")}
                className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white"
              >
                <option value="">-- Select status --</option>
                <option value="unhealthy">Unhealthy</option>
                <option value="healthy">Healthy</option>
              </select>
              <div className="mb-4">
                <label className="block text-sm mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  {...register("image")}
                  className="w-full bg-[#262622] border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <button className="w-full bg-green-700 hover:bg-gray-600 transition-colors py-2 border rounded-md text-white font-semibold">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
export default AnimalForm;
