import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object({
  status: Yup.string().required("Status is required"),
  user_id: Yup.number()
    .typeError("Must be a number")
    .required("User ID is required"),
  animal_id: Yup.number()
    .typeError("Must be a number")
    .required("Animal ID is required"),
});

const CreateAdoptionForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Placeholder for backend API call
      console.log("Form data submitted:", values);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Adoption Record
      </h2>
      <Formik
        initialValues={{ status: "", user_id: "", animal_id: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-5">
            {/* Status Field */}
            <div>
              <label htmlFor="status" className="block font-medium mb-1">
                Status
              </label>
              <Field
                name="status"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* User ID Field */}
            <div>
              <label htmlFor="user_id" className="block font-medium mb-1">
                User ID
              </label>
              <Field
                name="user_id"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="user_id"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Animal ID Field */}
            <div>
              <label htmlFor="animal_id" className="block font-medium mb-1">
                Animal ID
              </label>
              <Field
                name="animal_id"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="animal_id"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAdoptionForm;
