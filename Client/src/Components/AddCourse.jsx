import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import AddCourseForm from "./AddCourseForm"; // Import the course form
import axios from "axios";

const AddCourse = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [courses, setCourses] = useState([]); // State for storing courses
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  // Function to handle "Add Course" button click
  const handleAddCourseClick = () => {
    setShowForm(true); // Show the form
  };

  // Function to handle form submission
  const handleFormSubmit = async (courseData) => {
    try {
      // Send a POST request with the course data
      const response = await axios.post(
        "http://localhost:4000/course/add",
        courseData
      );

      // Handle successful form submission
      console.log("Course added successfully:", response.data);

      // Fetch updated courses list
      await fetchCourses();

      // Navigate to Admin Dashboard after submission
      navigate("/admin-dashboard"); // Change to your admin dashboard route
    } catch (error) {
      // Handle any errors during the submission
      console.error("Error adding course:", error);
    }
  };

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get("http://localhost:4000/course/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data); // Assuming the response contains the courses array
    } catch (error) {
      setError("Failed to fetch courses.");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-darker text-whiter p-6 ">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a
              href="/admin-dashboard"
              className="text-mid hover:text-light font-semibold block"
            >
              Dashboard Overview
            </a>
          </li>
          <li className="mb-4">
            <Link
              to="/AddTrainer"
              className="text-mid hover:text-light font-semibold block"
            >
              Trainers
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/AddEmployee"
              className="text-mid hover:text-light font-semibold block"
            >
              Employees
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/AddCourses"
              className="text-mid hover:text-light font-semibold block"
            >
              Courses
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddCourseClick}
            className="bg-dark hover:bg-darker text-whiter font-bold py-2 px-4 rounded transition duration-200"
          >
            Add Course
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>{" "}
            {/* Overlay */}
            <div className="bg-whiter rounded-lg shadow-lg p-6 w-1/3 z-10">
              <h2 className="text-dark text-xl mb-4 text-center">
                Add New Course
              </h2>
              <AddCourseForm onSubmit={handleFormSubmit} />
              <button
                className="mt-4 bg-darker hover:bg-mid text-whiter font-bold py-2 px-4 rounded"
                onClick={() => setShowForm(false)} // Close modal when cancel is clicked
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Course Table */}
        <div className="mt-6 flex justify-center">
          <div className="overflow-x-auto w-1/2 ">
            <h2 className="text-2xl font-bold mb-4 text-center text-dark">
              Course List
            </h2>
            <table className="w-full border-collapse border border-dark mb-8 rounded-md overflow-hidden shadow-lg">
              <thead className="bg-dark text-whiter">
                <tr>
                  <th className="border border-dark p-2 text-center">ID</th>
                  <th className="border border-dark p-2 text-center">Title</th>
                  <th className="border border-dark p-2 text-center">
                    Trainer
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-light transition duration-200"
                  >
                    <td className="border border-dark p-2">
                      {course.course_id}
                    </td>
                    <td className="border border-dark p-2">
                      {course.course_name}
                    </td>
                    <td className="border border-dark p-2">
                      {course.trainer_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
