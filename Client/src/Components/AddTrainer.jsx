import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AddTrainerForm from "./AddTrainerForm";
import Sidebar from "./Sidebar";

const AddTrainer = () => {
  const [trainers, setTrainers] = useState([]); // State to store trainers from API
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State to handle errors
  const [showForm, setShowForm] = useState(false); // State to toggle modal visibility
  const navigate = useNavigate(); // For navigation after form submission
  const location = useLocation(); // Get the current route

  // Fetch trainers from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/trainer/fetchTrainer"
        );
        setTrainers(response.data); // Assuming API returns trainers array
      } catch (err) {
        setError("Failed to fetch trainers.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Handle new trainer submission
  const handleAddTrainer = async (newTrainer) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/trainer/add/",
        newTrainer
      );
      setTrainers([...trainers, response.data.trainer]); // Add the new trainer to the list
      setShowForm(false); // Hide modal after adding trainer
      navigate("/admin-dashboard"); // Navigate to admin-dashboard after form submission
    } catch (err) {
      console.error("Failed to add trainer:", err);
    }
  };

  if (loading) {
    return <div>Loading trainers...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-whiter">
        {/* Trainer Dashboard Header */}
        <div className="w-full flex justify-between mb-4">
          <h1 className="text-dark text-2xl">Trainer Dashboard</h1>
          <button
            className="bg-dark hover:bg-darker text-whiter font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => setShowForm(true)} // Show the modal when button is clicked
          >
            Add Trainer
          </button>
        </div>

        {/* Modal Popup for Add Trainer Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            {/* Overlay */}
            <div className="bg-whiter rounded-lg shadow-lg p-6 w-1/3 z-10">
              <h2 className="text-dark text-xl mb-4 text-center">
                Add New Trainer
              </h2>
              <AddTrainerForm onSubmit={handleAddTrainer} />
              {/* Use AddTrainer form */}
              <button
                className="mt-4 bg-darker hover:bg-mid text-whiter font-bold py-2 px-4 rounded"
                onClick={() => setShowForm(false)} // Close modal when cancel is clicked
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Centered Trainer Table */}
        <div className="w-full flex justify-center">
          <table className="w-3/4 border-collapse border border-dark mb-8 rounded-md overflow-hidden shadow-lg">
            <thead className="bg-dark text-whiter">
              <tr>
                <th className="border border-light p-2 text-left">ID</th>
                <th className="border border-light p-2 text-left">Name</th>
                <th className="border border-light p-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr
                  key={trainer.id}
                  className="hover:bg-light transition duration-200"
                >
                  <td className="border border-dark p-2">{trainer.id}</td>
                  <td className="border border-dark p-2">{trainer.name}</td>
                  <td className="border border-dark p-2">{trainer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AddTrainer;
