const express = require("express");
const courseService = require("../services/courseService");
const authenticateJWT = require("../middlewares/authMiddleware");
const {
  addCourse,
  assignCourseToTrainer,
} = require("../controllers/courseController");
const router = express.Router();

// Route to add a course
router.post("/add", addCourse);
router.get("/courses", async (req, res) => {
  try {
    const courses = await courseService.fetchCourses();
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error in fetching courses route:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Route to assign a course to a trainer
// router.post("/assignCourse", assignCourseToTrainer);

module.exports = router;
