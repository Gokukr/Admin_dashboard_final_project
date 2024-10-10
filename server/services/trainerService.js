const prisma = require("../models/index");

exports.fetchTrainers = async (req, res) => {
  try {
    const trainerId = parseInt(req.params.trainerId);
    // console.log("Fetching trainer with ID:", trainerId);

    // Fetch the trainer information
    const trainer = await prisma.user.findUnique({
      where: {
        id: trainerId,
      },
    });

    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    // Fetch the course details if the trainer has a course_id
    let course = null;
    if (trainer.course_id) {
      course = await prisma.course.findUnique({
        where: {
          course_id: trainer.course_id,
        },
        select: {
          course_id: true, // Include course_id if needed
          name: true, // Include only the course name
          description: true, // Include description if needed
        },
      });
    }

    // Fetch employees who are associated with the same course_id as the trainer
    const employees = await prisma.user.findMany({
      where: {
        course_id: trainer.course_id, // Match employees by course_id
        role_id: 3, // Assuming role_id 3 represents employees
      },
      select: {
        id: true,
        name: true,
        email: true,
        course_id: true, // Include course_id for reference
      },
    });

    // Prepare the response with trainer, course, and employees details
    res.status(200).json({
      trainer,
      course,
      employees, // Include the list of employees in the response
    });
  } catch (error) {
    console.error("Error fetching trainer:", error);
    res.status(500).json({
      error: "An error occurred while fetching trainers and employees.",
    });
  }
};

exports.fetchtrainer = async (req, res) => {
  try {
    const trainers = await prisma.user.findMany({
      where: {
        role_id: 2, // Assuming role_id 2 is for trainers
      },
      select: {
        id: true,
        name: true,
        email: true,
        course_id: true, // Include course_id if you want to fetch course details later
      },
    });

    // If no trainers are found
    if (trainers.length === 0) {
      return res.status(404).json({ message: "No trainers found" });
    }

    // Return the list of trainers
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching trainers." });
  }
};

exports.fetchEmployees = async (req, res) => {
  try {
    const employees = await prisma.user.findMany({
      where: {
        role_id: 3,
      },
    });
  } catch (error) {}
};
