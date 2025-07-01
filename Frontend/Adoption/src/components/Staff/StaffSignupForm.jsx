import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils";

const StaffSignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/staff/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Signup failed");
      } else {
        toast.success("Staff registered successfully");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during signup");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Staff Signup
      </h2>

      <input
        {...register("name", { required: "Name is required" })}
        type="text"
        placeholder="Full Name"
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address"
          }
        })}
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <input
        {...register("contact_info", { required: "Contact is required" })}
        type="text"
        placeholder="Phone Number"
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />
      {errors.contact_info && (
        <p className="text-red-500">{errors.contact_info.message}</p>
      )}

    
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
};

export default StaffSignupForm;