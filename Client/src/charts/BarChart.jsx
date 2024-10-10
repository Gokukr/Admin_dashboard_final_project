// BarChart.js
import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ marks }) => {
  // Calculate the average marks for each subject
  const subjectMarks = marks.reduce((acc, mark) => {
    const subject = mark.course_name; // Get the course name (subject)
    const mark1 = mark.marks.mark1 || 0; // Get the mark, default to 0 if null

    if (!acc[subject]) {
      acc[subject] = { totalMarks: 0, count: 0 };
    }

    acc[subject].totalMarks += mark1; // Add the mark to the total
    acc[subject].count += 1; // Increment the count for averaging

    return acc;
  }, {});

  // Prepare data for the chart by calculating the average for each subject
  const subjects = Object.keys(subjectMarks); // Array of subject names
  const averageMarks = subjects.map((subject) => {
    const { totalMarks, count } = subjectMarks[subject];
    return (totalMarks / count).toFixed(2); // Calculate the average
  });

  const chartOptions = {
    chart: {
      type: "bar",
      height: 250,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: subjects, // Subject names for the x-axis
    },
    colors: ["#E4B1F0"], // Color palette
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} marks`; // Custom tooltip format
        },
      },
    },
    title: {
      text: "Average Marks by Subject",
      align: "center",
      style: {
        color: "#433878",
        fontSize: "20px",
      },
    },
  };

  const chartData = [
    {
      name: "Average Marks",
      data: averageMarks, // Use the average marks for the bar chart
    },
  ];

  return (
    <div className="bg-whiter p-6 shadow-md rounded-md">
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={340}
      />
    </div>
  );
};

export default BarChart;
