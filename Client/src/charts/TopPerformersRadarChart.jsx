// TopPerformersRadarChart.js
import React from "react";
import Chart from "react-apexcharts";

const TopPerformersRadarChart = ({ data }) => {
  // Check if data is available
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available for the chart.</div>; // Display a message if no data
  }

  // Calculate average marks for each employee
  const averageMarks = data.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = {
        name: item.name,
        marks: {},
      };
    }
    acc[item.name].marks[item.course_name] = item.avg_mark || 0; // Set avg_mark for course
    return acc;
  }, {});

  // Create an array for the radar chart
  const series = Object.values(averageMarks).map((emp) => ({
    name: emp.name,
    data: Object.values(emp.marks), // Get marks for radar chart
  }));

  const categories = Object.keys(series[0].data).map(
    (_, index) => data[index]?.course_name || `Course ${index + 1}`
  );

  const options = {
    chart: {
      type: "radar",
      height: 350,
    },
    title: {
      text: "Top Performers Radar Chart",
    },
    xaxis: {
      categories: categories,
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColor: "#e0e0e0",
          fill: {
            opacity: 0.5,
          },
        },
      },
    },
    markers: {
      size: 5,
    },
    colors: ["#FF4560", "#008FFB", "#00E396"], // Custom colors for the radar chart
  };

  return (
    <div>
      <Chart options={options} series={series} type="radar" height={350} />
    </div>
  );
};

export default TopPerformersRadarChart;
