// models/index.js

const { PrismaClient } = require("@prisma/client");

// Initialize Prisma Client
const prisma = new PrismaClient();

// Export the Prisma client for use in other modules
module.exports = prisma;
