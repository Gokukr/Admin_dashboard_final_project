import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [trainers, setTrainers] = useState([]); // State to hold trainer options
  const [selectedTrainer, setSelectedTrainer] = useState(""); // State for selected trainer
  const [message, setMessage] = useState(""); // State for displaying success or error messages
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize navigate

  console.log(courseName);

  useEffect(() => {
    // Fetch trainers from the backend
    const fetchTrainers = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:4000/trainer/fetchTrainer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data, "complete");

        const trainerNames = response.data.map((trainer) => ({
          id: trainer.id, // Ensure this matches your API response
          name: trainer.name,
          role: trainer.role_id,
        }));
        console.log("trainerDetails", trainerNames);

        setTrainers(trainerNames); // Set the trainers state
      } catch (error) {
        console.error("Error fetching trainers:", error);
        setMessage("Failed to fetch trainers.");
      }
    };

    fetchTrainers(); // Fetch trainers when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("authToken");

    try {
      // Send course details and trainerId together in a single request
      const courseResponse = await axios.post(
        "http://localhost:4000/course/add",
        {
          courseName: courseName,
          description: description, // Assuming your API accepts this parameter
          trainerId: selectedTrainer !== "" ? parseInt(selectedTrainer) : null, // Include trainerId in the same payload
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        } // Ensure this is the correct route
      );

      console.log(courseResponse.data);

      // Assuming the backend returns the newly added course data
      const newCourse = courseResponse.data;
      console.log(newCourse);

      // Clear form fields after submission
      setCourseName("");
      setDescription("");
      setSelectedTrainer("");
      setMessage("Course added and assigned to trainer successfully!");
      toast.success("Course added successfully!");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error adding course and assigning to trainer:", error);
      setMessage("Failed to add course and assign to trainer.");
      toast.error("Failed to add course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-96"
    >
      {message && <p>{message}</p>} {/* Display success or error message */}
      <div className="mb-4">
        <label htmlFor="courseName" className="block text-mid font-medium mb-2">
          Course Name
        </label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full px-4 py-2 border border-mid rounded focus:outline-none focus:ring-2 focus:ring-mid"
          placeholder="Enter course name"
          required
        />
      </div>
      {/* Uncomment if you want to include description field */}
      {/* <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-mid font-medium mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-mid rounded focus:outline-none focus:ring-2 focus:ring-mid"
          placeholder="Enter course description"
          required
        />
      </div> */}
      <div className="mb-4">
        <label htmlFor="trainer" className="block text-mid font-medium mb-2">
          Trainer
        </label>
        <select
          id="trainer"
          value={selectedTrainer}
          onChange={(e) => {
            setSelectedTrainer(e.target.value);
            console.log(selectedTrainer);
          }} // This will update the state
          className="w-full px-4 py-2 border border-mid rounded focus:outline-none focus:ring-2 focus:ring-mid"
          required
        >
          <option value="" disabled>
            Select a trainer
          </option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name} {/* Displaying only the trainer's name */}
            </option>
          ))}
        </select>
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

export default AddCourseForm;
