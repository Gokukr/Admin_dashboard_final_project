// controllers/userController.js
const prisma = require("../models");
const mailService = require("../services/mailer"); // Email sending function
const bcrypt = require("bcrypt");

const userController = {
  addUser: async (req, res) => {
    const { name, email } = req.body;
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role_id: 3,
        },
      });

      await mailService.sendMail(
        email,
        "Employee Performance Rate",
        ` Thank you for registering with us ur password ${password}`
      );
      res.status(201).json({ message: "User added successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the user." });
    }
  },
};

module.exports = userController;
