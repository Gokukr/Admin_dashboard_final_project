// DoughnutChart.js
import { color } from "framer-motion";
import React from "react";
import Chart from "react-apexcharts";

const DoughnutChart = ({ marks }) => {
  console.log(marks, "doughut marks");

  const scoreRanges = {
    "0-49": 0,
    "50-69": 0,
    "70-89": 0,
    "90-100": 0,
  };

  marks.forEach((mark) => {
    console.log(mark.marks.mark1);

    if (mark.marks.mark1 < 50) scoreRanges["0-49"]++;
    else if (mark.marks.mark1 < 70) scoreRanges["50-69"]++;
    else if (mark.marks.mark1 < 90) scoreRanges["70-89"]++;
    else scoreRanges["90-100"]++;
  });

  const data = {
    options: {
      chart: {
        type: "donut",
        toolbar: { show: false },
      },
      labels: Object.keys(scoreRanges),
      title: {
        text: "Marks Distribution of final_scores",
        align: "center",
        color: "#433878",
      },

      colors: ["#433878", "#7E60BF", "#E4B1F0", "#FFE1FF", "#fff"],
    },

    series: Object.values(scoreRanges),
  };

  return (
    <Chart
      options={data.options}
      series={data.series}
      type="donut"
      height={350}
    />
  );
};

export default DoughnutChart;
