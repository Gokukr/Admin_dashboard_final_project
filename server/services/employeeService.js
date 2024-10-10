const prisma = require("../models/index");

exports.findEmployees = async (req, res) => {
  try {
    // const trainerId = parseInt(req.params.trainerId);
    const employees = await prisma.user.findMany({
      where: {
        role_id: 3, // Assuming role_id 2 is for trainers
        // id: trainerId,
      },
    });
    console.log(employees);

    res.status(200).json(employees); // Send the list of trainers back in the response
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees." });
  }
};
exports.addPerformanceMarks = async (employeeId, courseId, mark1, mark2) => {
  console.log(employeeId, courseId, mark1, mark2, "data for marks");

  // Check if the user with employeeId is an employee (role_id = 3)
  const employee = await prisma.user.findUnique({
    where: { id: parseInt(employeeId) },
  });

  if (!employee || employee.role_id !== 3) {
    throw new Error("Invalid employee or employee does not exist.");
  }

  // Calculate avg_mark if mark2 is provided
  const avgMark = mark2 ? (mark1 + mark2) / 2 : mark1;

  const newPerformance = await prisma.performance.create({
    data: {
      // No need to include emp_id and course_id directly; wrap them under the relation field if needed.
      user: {
        connect: {
          id: parseInt(employeeId), // Employee/User ID
        },
      },
      course: {
        connect: {
          course_id: courseId, // Course ID
        },
      },
      mark1: parseFloat(mark1),
      mark2: parseInt(mark2),
      avg_mark: parseFloat((mark1 + mark2) / 2), // Calculate avg_mark as needed
    },
  });
  console.log(newPerformance);

  return newPerformance;
};
