const adminService = require("../services/adminService");

exports.displayData = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).send("Email is required.");
    }

    // Fetch admin data
    const adminData = await adminService.fetchAdmin(email);

    // Log the admin data to see its content
    console.log("Admin Data:", adminData);

    // Send response back to the client
    res.json(adminData);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("Error fetching admin data");
  }
};
