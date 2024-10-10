import React, { useState } from "react";

const Feedback = ({ employee, onSubmit, onClose }) => {
  // Initialize the state to store feedback scores
  const [feedback, setFeedback] = useState({
    codingStandards: "",
    logicalThinking: "",
    communication: "",
    teamwork: "",
  });

  // Function to handle changes in radio button selections
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  // Function to calculate the total score based on the selected ratings
  const calculateTotalScore = () => {
    const scores = {
      "Very Good": 5,
      Good: 4,
      Fair: 3,
      Poor: 2,
      "Very Poor": 1,
    };

    return Object.keys(feedback).reduce((total, attribute) => {
      const score = scores[feedback[attribute]] || 0; // Default to 0 if no selection
      return total + score;
    }, 0);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = calculateTotalScore(); // Calculate total score

    const feedbackData = {
      feedback,
      employeeId: employee.id,
      totalScore, // Include the total score in the submission
    };

    onSubmit(feedbackData); // Pass feedback data to the parent component
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-xl mb-4">Feedback for {employee.name}</h2>
      <form onSubmit={handleSubmit}>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Attribute</th>
              <th className="border p-2 text-center">Very Good</th>
              <th className="border p-2 text-center">Good</th>
              <th className="border p-2 text-center">Fair</th>
              <th className="border p-2 text-center">Poor</th>
              <th className="border p-2 text-center">Very Poor</th>
            </tr>
          </thead>
          <tbody>
            {/* Coding Standards */}
            <tr>
              <td className="border p-2">Coding Standards</td>
              {["Very Good", "Good", "Fair", "Poor", "Very Poor"].map(
                (level) => (
                  <td className="border p-2 text-center" key={level}>
                    <input
                      type="radio"
                      name="codingStandards"
                      value={level}
                      checked={feedback.codingStandards === level}
                      onChange={handleChange}
                    />
                  </td>
                )
              )}
            </tr>

            {/* Logical Thinking */}
            <tr>
              <td className="border p-2">Logical Thinking</td>
              {["Very Good", "Good", "Fair", "Poor", "Very Poor"].map(
                (level) => (
                  <td className="border p-2 text-center" key={level}>
                    <input
                      type="radio"
                      name="logicalThinking"
                      value={level}
                      checked={feedback.logicalThinking === level}
                      onChange={handleChange}
                    />
                  </td>
                )
              )}
            </tr>

            {/* Communication */}
            <tr>
              <td className="border p-2">Communication</td>
              {["Very Good", "Good", "Fair", "Poor", "Very Poor"].map(
                (level) => (
                  <td className="border p-2 text-center" key={level}>
                    <input
                      type="radio"
                      name="communication"
                      value={level}
                      checked={feedback.communication === level}
                      onChange={handleChange}
                    />
                  </td>
                )
              )}
            </tr>

            {/* Teamwork */}
            <tr>
              <td className="border p-2">Teamwork</td>
              {["Very Good", "Good", "Fair", "Poor", "Very Poor"].map(
                (level) => (
                  <td className="border p-2 text-center" key={level}>
                    <input
                      type="radio"
                      name="teamwork"
                      value={level}
                      checked={feedback.teamwork === level}
                      onChange={handleChange}
                    />
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>

        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
