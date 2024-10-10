// CoursePieChart.js
import React from "react";
import Chart from "react-apexcharts";

const CoursePieChart = ({ marks }) => {
  // Aggregate the count of employees per course
  const courseCounts = marks.reduce((acc, curr) => {
    const courseName = curr.course_name;
    acc[courseName] = (acc[courseName] || 0) + 1; // Count occurrences of each course
    return acc;
  }, {});

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(courseCounts), // Labels will be the course names
    colors: ["#433878", "#7E60BF", "#E4B1F0", "#FFE1FF"], // Custom color palette
    title: {
      text: "Course Enrollment Distribution",
      align: "center",
      style: {
        color: "#433878",
        fontSize: "20px",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} employees`; // Tooltip showing the number of employees per course
        },
      },
    },
  };

  const chartData = Object.values(courseCounts); // Data is the count of employees per course

  return (
    <div className="bg-whiter p-6 shadow-md rounded-md">
      <Chart
        options={chartOptions}
        series={chartData}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default CoursePieChart;
