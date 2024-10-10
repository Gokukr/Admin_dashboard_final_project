import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TrainerDashboard = () => {
  const { trainerId } = useParams();
  const [reqEmployees, setReqemployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const trainerId = localStorage.getItem("id");

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/trainer/fetchTrainers/${trainerId}`
        );
        setEmployees(response.data.employees);
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [trainerId]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/trainer/fetchEmployees"
        );
        setReqemployees(response.data);
      } catch (err) {
        console.error("Failed to fetch employee details:", err);
      }
    };

    fetchAllEmployees();
  }, []);

  const handleMarkChange = (employeeId, markType, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [employeeId]: {
        ...prevMarks[employeeId],
        [markType]: value,
      },
    }));
  };

  const handleSubmitMarks = async (employeeId) => {
    const { mark1, mark2 } = marks[employeeId];

    try {
      await axios.post(
        `http://localhost:4000/user/employees/${employeeId}/addMarks`,
        {
          courseId: reqEmployees[0].course_id,
          mark1,
          mark2,
        }
      );
      alert("Marks added successfully!");
      setMarks((prevMarks) => ({
        ...prevMarks,
        [employeeId]: { mark1: "", mark2: "" },
      }));
    } catch (err) {
      alert("Failed to add marks.");
    }
  };

  if (loading) {
    return <div className="text-light">Loading employees...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-whiter">
      <h1 className="text-dark text-2xl mb-4">
        Employees for Trainer ID: {localStorage.getItem("id")}
      </h1>

      <h2 className="text-xl mb-4">Trainer's Employees</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full max-w-3xl mx-auto border-collapse border border-darker rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-dark text-whiter">
            <tr>
              <th className="border border-dark p-2 text-left">ID</th>
              <th className="border border-dark p-2 text-left">Name</th>
              <th className="border border-dark p-2 text-left">Email</th>
              {/* <th className="border border-dark p-2 text-left">Course Name</th> */}
              <th className="border border-dark p-2 text-left">Mark 1</th>
              <th className="border border-dark p-2 text-left">add feedback</th>
              <th className="border border-dark p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reqEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-mid transition duration-200"
              >
                <td className="border border-light p-2">{employee.id}</td>
                <td className="border border-light p-2">{employee.name}</td>
                <td className="border border-light p-2">{employee.email}</td>
                {/* <td className="border border-light p-2">
                  {employee.course?.name}
                </td> */}
                <td className="border border-light p-2">
                  <input
                    type="number"
                    value={marks[employee.id]?.mark1 || ""}
                    onChange={(e) =>
                      handleMarkChange(employee.id, "mark1", e.target.value)
                    }
                    placeholder="Enter Mark 1"
                    className="border border-gray-400 p-1 rounded"
                  />
                </td>
                <td className="border border-light p-2">
                  <input
                    type="number"
                    value={marks[employee.id]?.mark2 || ""}
                    onChange={(e) =>
                      handleMarkChange(employee.id, "mark2", e.target.value)
                    }
                    placeholder="Enter Mark 2"
                    className="border border-gray-400 p-1 rounded"
                  />
                </td>
                <td className="border border-light p-2">
                  <button
                    onClick={() => handleSubmitMarks(employee.id)}
                    className="bg-dark text-whiter p-2 rounded hover:bg-mid transition duration-200"
                  >
                    Add Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerDashboard;
