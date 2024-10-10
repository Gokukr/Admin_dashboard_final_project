const prisma = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// exports.register = async (userData) => {
//   const { email, password } = userData;

//   // Check if user already exists
//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // Hash password and save the user to the database
//   const hashedPassword = await bcrypt.hash(password, 10);
//   return prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });
// };
// // services/userService.js

const loginUser = async (email, password) => {
  try {
    // Find the user in the database by email
    const user = await prisma.user.findUnique({
      where: { email }, // Correctly specify the email field
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored hashed password
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password doesn't match, throw an error
    // if (!isPasswordValid) {
    //   throw new Error("Invalid email or password");
    // }

    // Generate a JWT token if the login is successful
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role_id: user.role_id,
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return both the generated token and the user's role_id
    return { token, role_id: user.role_id, id: user.id };
  } catch (error) {
    console.error("Error in loginUser:", error.message); // Log the error message
    throw error; // Rethrow the error for further handling by the caller
  }
};

module.exports = loginUser;

// return user; // Log the user object for debugging

// Compare the provided password with the stored hashed password
// const isPasswordValid = await bcrypt.compare(password, user.password);

// // If password doesn't match, throw an error
// if (!isPasswordValid) {
//   throw new Error("Invalid email or password");
// }
