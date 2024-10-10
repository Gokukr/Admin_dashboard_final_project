import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployeeForm from "./AddEmployeeForm"; // Adjust the path as necessary
import { Link } from "react-router-dom"; // Import Link for navigation

const AddEmployee = () => {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]); // State for storing employees
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for handling errors

  const handleAddEmployee = () => {
    setShowForm(true);
  };

  const handleSubmit = async (employeeData) => {
    try {
      // Replace 'your_token_here' with the actual token
      const token = localStorage.getItem("authToken"); // You can retrieve this from local storage or state if necessary.

      const response = await axios.post(
        "http://localhost:4000/trainer/addEmployee",
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the authorization header
          },
        }
      );

      console.log("Employee Data:", response.data);

      // Update the employees list with the new employee
      setEmployees([...employees, response.data.employee]);

      // Hide the form after submission
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add employee:", err);
      setError("Failed to add employee.");
    }
  };

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/trainer/fetchEmployees"
        );
        setEmployees(response.data); // Assuming API returns employees array
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading employees...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-whiter">
      {/* Sidebar */}
      <aside className="w-64 bg-darker text-whiter p-6">
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

      {/* Main content */}
      <div className="flex flex-col flex-grow p-6">
        <h1 className="text-3xl font-bold text-dark mb-6">Add Employee</h1>

        {/* Flex container for positioning the button */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={handleAddEmployee}
            className="bg-dark hover:bg-darker text-whiter font-bold py-2 px-4 rounded transition duration-200"
          >
            Add Employee
          </button>
        </div>

        {/* Modal Popup for Add Employee Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            {/* Overlay */}
            <div className="bg-whiter rounded-lg shadow-lg p-6 w-1/3 z-10">
              <h2 className="text-dark text-xl mb-4 text-center">
                Add New Employee
              </h2>
              <AddEmployeeForm onSubmit={handleSubmit} />
              <button
                className="mt-4 bg-darker hover:bg-mid text-whiter font-bold py-2 px-4 rounded"
                onClick={() => setShowForm(false)} // Close modal when cancel is clicked
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Employee Table */}
        <div className="w-full flex justify-center mt-6">
          <table className="w-1/2 border-collapse border border-dark mb-8 rounded-md overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-dark text-whiter">
                <th className="border border-dark p-2">ID</th>
                <th className="border border-dark p-2">Name</th>
                <th className="border border-dark p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-light">
                  <td className="border border-dark p-2">{employee.id}</td>
                  <td className="border border-dark p-2">{employee.name}</td>
                  <td className="border border-dark p-2">{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
