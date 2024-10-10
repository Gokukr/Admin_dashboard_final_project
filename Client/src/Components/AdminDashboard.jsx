import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CoursePieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import StatCard from "./StatCard";
import TopPerformersRadarChart from "../charts/TopPerformersRadarChart";
import TopPerformersTable from "../charts/TopPerformersTable";
import HeatmapChart from "../charts/HeatmapChart";
import DoughnutChart from "../charts/DoughnutChart";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [marks, setMarks] = useState([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [trainersCount, setTrainersCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/marks")
      .then((response) => response.json())
      .then((data) => {
        setMarks(data);

        const uniqueCourses = new Set(data.map((mark) => mark.course_id)).size;
        const uniqueEmployees = new Set(data.map((mark) => mark.emp_id)).size;

        setCoursesCount(uniqueCourses);
        setEmployeesCount(uniqueEmployees);

        const uniqueTrainers =
          new Set(data.map((mark) => mark.trainer_id)).size || 5;
        setTrainersCount(uniqueTrainers);
        console.log(trainersCount);
      })
      .catch((error) => console.error("Error fetching marks:", error));
  }, []);

  return (
    <div className="min-h-screen bg-light flex">
      {/* Sidebar */}
      <Sidebar className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white" />

      {/* Main content */}
      <main className="ml-64 p-6 flex-1 bg-light">
        <h1 className="text-3xl font-bold text-dark mb-4">Welcome Admin</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-5 mb-8 ml-20 mt-10">
          <StatCard title="Total Courses" count={coursesCount} bgColor="dark" />
          <StatCard
            title="Total Employees"
            count={employeesCount}
            bgColor="dark"
          />
          <StatCard
            title="Total Trainers"
            count={trainersCount}
            bgColor="dark"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="mt-5 w-11/12 mx-auto">
            {" "}
            {/* Decreased width */}
            <BarChart marks={marks} />
          </div>

          {/* Pie Chart */}
          <div className="mt-5 w-11/12 mx-auto">
            {" "}
            {/* Decreased width */}
            <CoursePieChart marks={marks} />
          </div>

          {/* Doughnut Chart */}
          <div className="mt-5 w-11/12 mx-auto bg-white rounded-md drop-shadow-md">
            {" "}
            {/* Decreased width */}
            <DoughnutChart marks={marks} />
          </div>

          {/* Top Performers Table */}
          <div className="mt-5 w-11/12 mx-auto bg-white p-5 rounded-md drop-shadow-md">
            {" "}
            {/* Decreased width */}
            <TopPerformersTable data={marks} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
