const express = require("express");
const { displayData } = require("../controllers/adminController"); // Ensure the path is correct
const router = express.Router();

// Define your routes
router.post("/data", displayData); // Ensure to use POST if you are sending data

module.exports = router; // Export the router
