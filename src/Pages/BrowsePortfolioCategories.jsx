import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const categories = [
  { title: "Lab Reports", rating: 4.95, skills: 45 },
  { title: "Assignments", rating: 4.89, skills: 112 },
  { title: "Projects", rating: 4.93, skills: 86 },
  { title: "Research Work", rating: 4.91, skills: 31 },
  { title: "Photography", rating: 4.88, skills: 50 },
  { title: "Homeworks", rating: 4.75, skills: 78 },
  { title: "Development", rating: 4.97, skills: 154 },
  { title: "Others", rating: 4.66, skills: 29 },
];

const cardVariants = {
  rest: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 12px 28px rgba(0, 123, 255, 0.2)",
    borderColor: "#3b82f6", // Tailwind blue-500
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const BrowsePortfolioCategories = () => {
  return (
    <div className="px-6 py-14  mx-auto">
      <div className="text-left mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Browse by Category</h2>
        <p className="text-gray-500 text-lg mt-2">
          Explore your academic and creative work by category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            className=" border border-blue-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer"
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              {cat.title}
            </h3>
            <div className="flex items-center gap-2 text-blue-500 text-sm font-medium mb-1">
              <FaStar />
              <span>{cat.rating}/5</span>
            </div>
            <div className="text-gray-600 text-sm">{cat.skills} items</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePortfolioCategories;
