const prisma = require("../models/index");

// Exported function to get course details
exports.getCourseDetails = async () => {
  try {
    const courseDetails = await prisma.performance.findMany({
      include: {
        user: {
          select: {
            id: true, // emp_id
            name: true, // employee name
          },
        },
        course: {
          select: {
            course_id: true, // course_id
            name: true, // course_name
            trainer_id: true,
          },
        },
      },
    });

    // Map the result to get the desired structure
    const result = courseDetails.map((detail) => ({
      emp_id: detail.user.id,
      name: detail.user.name,
      course_id: detail.course.course_id,
      course_name: detail.course.name,
      marks: {
        mark1: detail.mark1,
        mark2: detail.mark2,
      },
      avg_mark: detail.avg_mark,
      trainer_id: detail.course.trainer_id,
    }));

    return result; // Return the structured data
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw new Error("Error fetching course details"); // Throw an error to be handled by the caller
  } finally {
    await prisma.$disconnect(); // Ensure disconnection from the database
  }
};
// exports.getMaxAverageMarksByEmployee = async () => {
//   try {
//     // Fetch employee names and average marks
//     const averageMarksByEmployee = await prisma.performance.groupBy({
//       by: ["emp_id"],
//       _avg: {
//         avg_mark: true, // Calculate average of avg_mark for each employee
//       },
//     });

//     // Find the maximum average mark
//     const maxAvgMarkRecord = averageMarksByEmployee.reduce((max, record) => {
//       return (max._avg.avg_mark || 0) > (record._avg.avg_mark || 0)
//         ? max
//         : record;
//     });

//     // Fetch the employee's name using the emp_id
//     const employee = await prisma.user.findUnique({
//       where: {
//         id: maxAvgMarkRecord.emp_id, // Assuming `id` is the primary key for employee
//       },
//       select: {
//         name: true, // Adjust field name as per your Employee model
//       },
//     });

//     console.log(
//       `Employee with highest average mark: ${employee?.name}, Average Mark: ${
//         maxAvgMarkRecord._avg.avg_mark || 0
//       }`
//     );
//   } catch (error) {
//     console.error("Error fetching max average marks:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };
