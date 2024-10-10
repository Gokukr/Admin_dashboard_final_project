// // routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
// const { authenticateJWT } = require("../middlewares/authMiddleware");

// router.use(authenticateJWT);
// // POST route for user login
// router.post("/login", userController.login);

// module.exports = router;
// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const { addPerformanceMarks } = require("../services/employeeService");

const router = express.Router();

router.post("/add", userController.addUser); // Route to add user
router.post("/employees/:employeeId/addMarks", async (req, res) => {
  const { employeeId } = req.params;
  const { courseId, mark1, mark2 } = req.body;
  console.log(req.body, "req body");

  console.log(mark2, "marks 2");

  try {
    const newPerformance = await addPerformanceMarks(
      employeeId,
      courseId,
      mark1,
      mark2
    );
    res.status(200).json(newPerformance);
  } catch (error) {
    console.error("Error adding performance record:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
