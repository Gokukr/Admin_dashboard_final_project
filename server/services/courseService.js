const prisma = require("../models/index");

exports.fetchCourses = async () => {
  try {
    const courseData = await prisma.$queryRaw`
      SELECT
        c."course_id",
        c."name" AS course_name,
        c."description",
        u."name" AS trainer_name
      FROM
        "Course" c
      LEFT JOIN
        "User" u
      ON
        c."trainer_id" = u."id" AND u."role_id" = 2
    `;
    return courseData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
};
