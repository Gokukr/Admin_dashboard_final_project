import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-darker text-whiter p-6 min-h-screen fixed">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <a
            href="/admin-dashboard"
            className="text-mid hover:text-light font-semibold block"
          >
            Dashboard Overview
          </a>
        </li>
        <li className="mb-4">
          <Link
            to="/AddTrainer"
            className="text-mid hover:text-light font-semibold block"
          >
            Trainers
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/AddEmployee"
            className="text-mid hover:text-light font-semibold block"
          >
            Employees
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/AddCourses"
            className="text-mid hover:text-light font-semibold block"
          >
            Courses
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
