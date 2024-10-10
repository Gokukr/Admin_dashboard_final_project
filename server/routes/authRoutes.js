const express = require("express");
const authenticateJWT = require("../middlewares/authMiddleware");
const { login } = require("../controllers/authController");
const router = express.Router();
// router.use(authenticateJWT);

router.post("/login", login);

router.get("/admin-access", authenticateJWT, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

module.exports = router;

// const express = require("express");
// const { displayData } = require("../controllers/adminController"); // Ensure the path is correct
// const router = express.Router();

// // Define your routes
// router.post("/data", displayData); // Ensure to use POST if you are sending data

// module.exports = router; // Export the router
