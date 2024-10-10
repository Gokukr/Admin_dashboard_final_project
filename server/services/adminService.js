const prisma = require("../models/index");

exports.fetchAdmin = async (email) => {
  try {
    const data = await prisma.user.findUnique({
      where: { email }, // Ensure this matches your Prisma model structure
    });

    if (!data) {
      throw new Error("Admin not found with that email.");
    }

    return data; // Return the found admin data
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error; // Propagate the error
  }
};
