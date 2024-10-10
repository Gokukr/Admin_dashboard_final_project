const express = require("express");
const markService = require("../services/markService");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const courseData = await markService.getCourseDetails(); // Call the exported function
    // const top_scores = await markService.getMaxAverageMarksByEmployee();
    res.status(200).json(courseData); // Send the course details as a JSON response
    // res.status(200).json(top_scores);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});
module.exports = router;
