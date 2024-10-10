// routes/trainerRoutes.js
const express = require("express");
const trainerController = require("../controllers/trainerController");
const trainerService = require("../services/trainerService");
const employeeService = require("../services/employeeService");

const router = express.Router();

router.post("/add", trainerController.addTrainer); // Route to add trainer
router.get("/fetchTrainers/:trainerId", trainerService.fetchTrainers);
router.get("/fetchTrainer", trainerService.fetchtrainer);
router.get("/fetchEmployees", employeeService.findEmployees);
module.exports = router;
