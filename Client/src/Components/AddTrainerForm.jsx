import React, { useState } from "react";
import axios from "axios"; // Axios for HTTP requests
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const AddTrainerForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      // Call the onSubmit prop with the trainer data
      await onSubmit({ name, email });

      // Clear the form fields after submission
      setName("");
      setEmail("");
      toast.success("trainer added successfully");
    } catch (error) {
      console.error("Error submitting trainer form:", error);
    } finally {
      setLoading(false); // Set loading to false once submission is done
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-whiter shadow-md rounded-lg p-6 w-96 ml-8"
    >
      <div className="mb-4">
        <label
          htmlFor="trainerName"
          className="block text-mid font-medium mb-2"
        >
          Trainer Name
        </label>
        <input
          type="text"
          id="trainerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-mid rounded focus:outline-none focus:ring-2 focus:ring-mid"
          placeholder="Enter trainer name"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-mid font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-mid rounded focus:outline-none focus:ring-2 focus:ring-mid"
          placeholder="Enter email"
          required
        />
      </div>

      <div className="flex justify-center">
        {loading ? (
          // Show loader when the form is being submitted
          <ClipLoader color={"#123abc"} loading={loading} size={35} />
        ) : (
          // Show the submit button when not loading
          <button
            type="submit"
            className="w-full bg-dark hover:bg-darker text-whiter font-bold py-2 px-4 rounded transition duration-200"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default AddTrainerForm;
