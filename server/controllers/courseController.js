const prisma = require("../models");

// Add a course and assign it to a trainer and all users with role_id = 3
exports.addCourse = async (req, res) => {
  const { courseName, description, trainerId } = req.body; // No need for userId
  console.log(req.body, "body");

  if (!courseName) {
    return res.status(400).json({ error: "Course name is required" });
  }

  if (!trainerId) {
    return res.status(400).json({ error: "Trainer ID is required" });
  }

  try {
    // Step 1: Check if the trainer exists and has role_id = 2
    const trainer = await prisma.user.findUnique({
      where: { id: trainerId },
      select: { id: true, role_id: true },
    });

    if (!trainer || trainer.role_id !== 2) {
      return res
        .status(404)
        .json({ error: "Trainer not found or invalid role" });
    }

    // Step 2: Create the course in the database
    const newCourse = await prisma.course.create({
      data: {
        name: courseName,
        description: description || "", // Default empty string if no description
        trainer_id: trainerId, // Assign the course to the trainer
      },
    });
    console.log(newCourse);
    try {
      const updatedUsers = await prisma.user.updateMany({
        where: { role_id: 3 },
        data: { course_id: newCourse.course_id },
      });
      console.log(updatedUsers, "users updated");
      return updatedUsers;
    } catch (error) {
      console.log("error in updating", error);
    }

    // Step 3: Update the course_id for the trainer
    await prisma.user.update({
      where: { id: trainerId },
      data: { course_id: newCourse.id },
    });

    // Step 4: Update the course_id for all users with role_id = 3 (users)

    // Check if any users were updated
    // if (updatedUsers.count === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No users with role_id = 3 found to update." });
    // }
    res.status(201).json({
      message: `Course added and assigned to trainer and ${updatedUsers.count} users`,
      newCourse,
    });
  } catch (error) {
    console.error("Error adding course and assigning trainer/users:", error);

    if (error.code === "P2003") {
      return res
        .status(400)
        .json({ error: "Invalid trainer ID or association issue" });
    }

    res
      .status(500)
      .json({ error: "Failed to add course and assign trainer/users" });
  }
};
