import React from "react";

const TopPerformersTable = ({ data }) => {
  // Check if data is available
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available for the table.</div>; // Display a message if no data
  }

  // Calculate average marks for each employee
  const averageMarks = data.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = {
        name: item.name,
        totalMarks: (item.marks["mark1"] + item.marks["mark2"]) / 2,
        count: 0,
      };
    }
    acc[item.name].count += 1; // Increment count for averaging
    return acc;
  }, {});

  // Prepare the data for the table and sort it in descending order by average marks
  const tableData = Object.values(averageMarks)
    .map((emp) => ({
      name: emp.name,
      avg_mark: (emp.totalMarks / emp.count).toFixed(2), // Calculate average
    }))
    .sort((a, b) => b.avg_mark - a.avg_mark) // Sort in descending order
    .slice(0, 5); // Select top 5 performers

  return (
    <div className="overflow-x-auto ">
      <h1 className="text-dark font-bold text-center mb-5">Top 5 Performers</h1>
      <table className="min-w-full bg-whiter border-dark">
        <thead>
          <tr className="bg-darker text-whiter">
            <th className="py-3 px-4 text-left">Employee Name</th>
            <th className="py-3 px-4 text-left">Average Marks</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((emp, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{emp.name}</td>
              <td className="py-3 px-4">{emp.avg_mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformersTable;
