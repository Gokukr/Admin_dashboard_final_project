// HeatmapChart.js
import React from "react";
import Chart from "react-apexcharts";

const HeatmapChart = ({ data }) => {
  // Transform the data into the required format for the heatmap
  const series = [];
  const categories = [...new Set(data.map((item) => item.course_name))];

  categories.forEach((course) => {
    const courseMarks = data
      .filter((item) => item.course_name === course)
      .map((item) => ({
        x: item.course_name,
        y: item.avg_mark || 0, // Default to 0 if avg_mark is null
      }));
    series.push({
      name: course,
      data: courseMarks,
    });
  });

  const options = {
    chart: {
      type: "heatmap",
      height: 350,
    },
    title: {
      text: "Employee Marks Heatmap",
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      categories: categories,
    },
    colors: ["#008FFB", "#00E396", "#FF4560"], // Custom colors for heatmap
  };

  return (
    <div>
      <Chart options={options} series={series} type="heatmap" height={350} />
    </div>
  );
};

export default HeatmapChart;
