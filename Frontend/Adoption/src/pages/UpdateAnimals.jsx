import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


function AnimalUpdateForm() {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();


  const fetchAnimal = async () => {
    if (!searchId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/animals/${searchId}`);
      if (!res.ok) throw new Error("Animal not found");
      const data = await res.json();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null) setValue(key, value);
      });
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`http://localhost:5000/animals/${searchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Animal updated successfully");
      reset();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Update Animal Info</h2>

      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Animal ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={fetchAnimal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
        <input {...register("species")} placeholder="Species" className="w-full border p-2 rounded" />
        <input {...register("age")} type="number" placeholder="Age" className="w-full border p-2 rounded" />
        <input {...register("gender")} placeholder="Gender" className="w-full border p-2 rounded" />
        <input {...register("image")} placeholder="Image URL" className="w-full border p-2 rounded" />
        <textarea {...register("description")} placeholder="Description" className="w-full border p-2 rounded" />
        <select {...register("health_status")} className="w-full border p-2 rounded">
          <option value="">Health Status</option>
          <option value="healthy">Healthy</option>
          <option value="unhealthy">Unhealthy</option>
        </select>
        <select {...register("adoption_status")} className="w-full border p-2 rounded">
          <option value="">Adoption Status</option>
          <option value="pending">Pending</option>
          <option value="adopted">Adopted</option>
          <option value="unadopted">Unadopted</option>
        </select>
        <button className="bg-green-700 text-white w-full p-2 rounded hover:bg-green-800">
          Update Animal
        </button>
      </form>
    </div>
  );
}

export default AnimalUpdateForm;
