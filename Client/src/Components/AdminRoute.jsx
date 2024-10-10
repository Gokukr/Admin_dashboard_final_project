// components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const roleId = localStorage.getItem("role_id"); // Get role_id from local storage
  console.log(roleId, "role id");

  if (roleId !== "1") {
    // Check if role_id is not 1
    return <Navigate to="/" />; // Redirect to home or another route
  }

  return children; // Render children if the role_id is 1
};

export default AdminRoute;
