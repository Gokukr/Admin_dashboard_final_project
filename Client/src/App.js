import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import TrainerDashboard from "./Components/TrainerDashboard";
import AddTrainer from "./Components/AddTrainer";
import AddEmployee from "./Components/AddEmployee";
import AddCourse from "./Components/AddCourse";
import AdminRoute from "./Components/AdminRoute";
import TrainerRoute from "./Components/TrainerRoute";
import { ToastContainer, Bounce } from "react-toastify";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            {/* Route for Login */}
            <Route path="/" element={<Login />} />

            {/* Route for Admin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Route for Trainer Dashboard */}
            <Route
              path="/trainer-dashboard"
              element={
                <TrainerRoute>
                  <TrainerDashboard />
                </TrainerRoute>
              }
            />
            <Route
              path="/AddTrainer"
              element={
                <AdminRoute>
                  <AddTrainer />
                </AdminRoute>
              }
            />
            <Route
              path="/AddEmployee"
              element={
                <AdminRoute>
                  <AddEmployee />
                </AdminRoute>
              }
            />
            <Route
              path="/AddCourses"
              element={
                <AdminRoute>
                  <AddCourse />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
