import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Feedback from "./Feedback";
import Modal from "react-modal"; // Optional: If using react-modal

const TrainerDashboard = () => {
  const { trainerId } = useParams();
  const [reqEmployees, setReqemployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marks, setMarks] = useState({});
  const [submittedMarks, setSubmittedMarks] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedEmployee(null);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log("Feedback submitted for employee:", selectedEmployee.id);
    console.log(feedbackData);

    setMarks((prevMarks) => ({
      ...prevMarks,
      [selectedEmployee.id]: {
        ...prevMarks[selectedEmployee.id],
        mark2: feedbackData.totalScore,
      },
    }));

    handleCloseModal();
  };

  const handleSubmitMarks = async (employeeId) => {
    const { mark1, mark2 } = marks[employeeId];

    const postData = {
      courseId: reqEmployees[0]?.course_id,
      mark1,
      mark2,
    };

    console.log("Posting the following data for employee:", employeeId);
    console.log(postData, "marks");
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

      setSubmittedMarks((prev) => ({
        ...prev,
        [employeeId]: true,
      }));

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
    <div className="p-6 bg-white">
      <h1 className="text-dark text-2xl mb-4">
        Employees for Trainer ID: {localStorage.getItem("id")}
      </h1>

      <h2 className="text-xl mb-4">Trainer's Employees</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full w-3/4 mx-auto border-collapse border border-dark rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-dark text-white">
            <tr>
              <th className="border border-gray-600 p-2 text-center">ID</th>
              <th className="border border-gray-600 p-2 text-center">Name</th>
              <th className="border border-gray-600 p-2 text-center">Email</th>
              <th className="border border-gray-600 p-2 text-center">Marks</th>
              <th className="border border-gray-600 p-2 text-center">
                Add Feedback
              </th>
              <th className="border border-gray-600 p-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reqEmployees.map((employee) => (
              <tr
                key={employee.id}
                className={`hover:bg-dark transition duration-200 ${
                  submittedMarks[employee.id] ? "bg-green-200" : ""
                }`}
              >
                <td className="border border-gray-200 p-2 text-center">
                  {employee.id}
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  {employee.name}
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  {employee.email}
                </td>
                <td className="border border-gray-200 p-2 text-center">
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
                <td className="border border-gray-200 p-2 text-center">
                  <button
                    onClick={() => handleOpenModal(employee)}
                    className="bg-dark text-white p-2 rounded hover:bg-darker transition duration-200"
                  >
                    Add Feedback
                  </button>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  <button
                    onClick={() => handleSubmitMarks(employee.id)}
                    className="bg-dark text-white p-2 rounded hover:bg-light transition duration-200"
                  >
                    Add Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          className="bg-white p-8 rounded-lg shadow-lg w-1/2"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <Feedback
            employee={selectedEmployee}
            onSubmit={handleFeedbackSubmit}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default TrainerDashboard;
