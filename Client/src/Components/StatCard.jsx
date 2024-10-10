import { motion } from "framer-motion"; // Import Framer Motion

const StatCard = ({ title, count, bgColor }) => {
  return (
    // Add animation effects with Framer Motion
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-lg shadow-lg bg-${bgColor} text-whiter flex flex-col justify-center items-center w-80 ml-8`}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold">{count}</p>
    </motion.div>
  );
};

export default StatCard;
