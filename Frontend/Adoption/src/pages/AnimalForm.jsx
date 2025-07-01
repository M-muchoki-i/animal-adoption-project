import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schemas for the Animal

const animalSchema = z.object({
  name: z.string().min(2, "Name is required"),
  species: z.string().min(2, "Species is required"),
  age: z.number().min(0, "Age must be a positive number"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  adoption_status: z.enum(["adopted", "pending", "unadopted"], {
    required_error: "Adoption status is required",
  }),
  health_status: z.enum(["healthy", "unhealthy"], {
    required_error: "Health status is required",
  }),
  image: z.string().url("Image must be a valid URL"),
});

function AnimalForm({ onAnimalAdded }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = localStorage.getItem("access_token");

  // React Hook Form with zod Resolver

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(animalSchema),
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



  

  useEffect(() => {
    if (user === null) return; // Wait until user is loaded
    if (!user || user.role !== "staff") {
      toast.error("Unauthorized. Staff only.");
      navigate("/login");
    }
  }, [user, navigate]);

  const onSubmit = (values) => {
    fetch("http://localhost:5000/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add animal");
        return res.json();
      })
      .then(() => {
        toast.success("Animal added successfully");
        reset();
        if (onAnimalAdded) onAnimalAdded();
      })
      .catch((err) => {
        console.error(err);
        toast.error("You are not authorized or something went wrong");
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 mb-8">
      <h2 className="text-3xl font-bold text-green-700 text-center">
        Add a New Animal
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Species</label>
          <input
            type="text"
            {...register("species")}
            placeholder="Species"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.species && (
            <p className="text-red-500">{errors.species.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input
            type="number"
            {...register("age")}
            placeholder="Age"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
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
          {errors.adoption_status && (
            <p className="text-red-500">{errors.adoption_status.message}</p>
          )}
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
          {errors.health_status && (
            <p className="text-red-500">{errors.health_status.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            rows={3}
            {...register("description")}
            placeholder="Short description"
            className="w-full border px-3 py-2 rounded resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            {...register("image")}
            placeholder="https://example.com/image.jpg"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
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
