// controllers/trainerController.js
const prisma = require("../models");
const mailService = require("../services/mailer"); // Email sending function
const bcrypt = require("bcrypt");

const trainerController = {
  addTrainer: async (req, res) => {
    const { name, email } = req.body;
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newTrainer = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role_id: 2,
        },
      });

      await mailService.sendMail(
        email,
        "Employee Performance Rate",
        `${email}, Thank you for registering with us anf this your password to login ${password}`
      );

      res.status(201).json({ message: "Trainer added successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the trainer." });
    }
  },
};

module.exports = trainerController;

// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");
// const prisma = require("../models/index");
// const trainerController = {
//   addTrainer: async (req, res) => {
//     const { name, email } = req.body;
//     const password = Math.random().toString(36).slice(-8); // Generate a random password

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create a new trainer in the database
//       const newTrainer = await prisma.user.create({
//         data: {
//           name,
//           email,
//           password: hashedPassword,
//           role_id: 2,
//         },
//       });

//       // Set up the nodemailer transport
//       const transporter = nodemailer.createTransport({
//         service: "Outlook", // Or use any other service like Outlook, etc.
//         auth: {
//           user: "gokula.k@jmangroup.com", // Your email address
//           pass: "#gokul@196", // Your email password (consider using environment variables for security)
//         },
//       });

//       // Email options
//       const mailOptions = {
//         from: "gokula.k@jmangroup.com", // Sender address
//         to: email, // Recipient's email
//         subject: "Welcome to the Team! Your Account Details",
//         text: `Hi ${name},\n\nWelcome to the team! Here are your account details:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease make sure to change your password after logging in.\n\nBest regards,\nThe Team`,
//       };

//       // Send the email
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error("Error sending email:", error);
//           return res.status(500).json({ error: "Failed to send email" });
//         }
//         console.log("Email sent:", info.response);
//         res.status(200).json({
//           message: "Trainer added and email sent successfully",
//           newTrainer,
//         });
//       });
//     } catch (error) {
//       console.error("Error adding trainer:", error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while adding the trainer" });
//     }
//   },
// };

// module.exports = trainerController;
