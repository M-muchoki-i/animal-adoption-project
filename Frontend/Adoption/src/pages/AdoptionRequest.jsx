import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CreateAdoptionForm = () => {
  const formik = useFormik({
    initialValues: {
      status: "",
      user_id: "",
      animal_id: "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Status is required"),
      user_id: Yup.number().required("User ID is required"),
      animal_id: Yup.number().required("Animal ID is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("http://127.0.0.1:5555/adoptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("🎉 Adoption request created!");
          resetForm();
        } else {
          toast.error(`❌ Failed: ${data.message || "Unknown error"}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("❌ Server error. Please try again.");
      }
    },
  });

  return (
    <>
      <h2 className="text-3xl text-green-600 font-serif font-bold text-center">
        Adopt a puppy today
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto bg-white p-6 shadow rounded-lg space-y-4"
      >
        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <p className="text-red-500 text-sm">{formik.errors.status}</p>
          )}
        </div>
        <div>
          <label>User ID</label>
          <input
            name="user_id"
            type="number"
            value={formik.values.user_id}
            onChange={formik.handleChange}
            className="w-full border px-2 py-1 rounded"
          />
          {formik.touched.user_id && formik.errors.user_id && (
            <p className="text-red-500 text-sm">{formik.errors.user_id}</p>
          )}
        </div>
        <div>
          <label>Animal ID</label>
          <input
            name="animal_id"
            type="number"
            value={formik.values.animal_id}
            onChange={formik.handleChange}
            className="w-full border px-2 py-1 rounded"
          />
          {formik.touched.animal_id && formik.errors.animal_id && (
            <p className="text-red-500 text-sm">{formik.errors.animal_id}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateAdoptionForm;
