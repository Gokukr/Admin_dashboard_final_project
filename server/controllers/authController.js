const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = require("../services/authService");

// // exports.register = async (req, res) => {
// //   const { username, password } = req.body;

// //   const userExists = await prisma.users.findUnique({ where: { username } });
// //   if (userExists) {
// //     return res.status(400).send("User already exists");
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10);
// //   await prisma.users.create({
// //     data: { username, password: hashedPassword },
// //   });

// //   res.status(201).send("User registered successfully");
// // };

// // controllers/userController.js
// const userService = require("../services/userService");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the service to handle the login logic
    const { token, role_id, id } = await loginUser(email, password);

    // If successful, return the token and role_id in response
    res.status(200).json({ token, role_id, id });
  } catch (error) {
    // Handle any errors thrown from the service
    res.status(401).json({ error: error.message });
  }
};
