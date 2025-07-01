import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";
import { BASE_URL } from "../../utils";

const AdoptionForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const animal = state?.animal;

  useEffect(() => {
    if (!animal) {
      toast.error("No animal data found. Redirecting...");
      navigate("/animals");
    }
  }, [animal, navigate]);

  const formik = useFormik({
    initialValues: {
      status: "pending",
      user_id: user?.id || "",
      animal_id: animal?.id || "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Status is required"),
      user_id: Yup.number().required("User ID is required"),
      animal_id: Yup.number().required("Animal ID is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${BASE_URL}/adoptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("🎉 Adoption request submitted!");
          resetForm();
          navigate("/animals");
        } else {
          toast.error(`❌ Failed: ${data.message || "Unknown error"}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("❌ Server error. Please try again.");
      }
    },
  });

  if (!animal || !user) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-green-600">
        Adoption Request
      </h2>

      {/* Animal Image */}
      {animal.image && (
        <div className="flex justify-center">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-64 object-cover rounded-lg mb-4 shadow"
          />
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">User Name</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Pet Name</label>
          <input
            type="text"
            value={animal.name}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={animal.description}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Adoption Status</label>
          <input
            type="text"
            value={animal.adoption_status}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Hidden form fields for submission */}
        <input type="hidden" name="user_id" value={formik.values.user_id} />
        <input type="hidden" name="animal_id" value={formik.values.animal_id} />
        <input type="hidden" name="status" value={formik.values.status} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Request for adoption
        </button>
      </form>

      {/* Back Button */}
      <div className="pt-4 text-center">
        <button
          onClick={() => navigate("/animals")}
          className="text-sm text-gray-600 underline hover:text-green-700"
        >
          ← Back to Animals
        </button>
      </div>
    </div>
  );
};

export default AdoptionForm;
