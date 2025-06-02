import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBriefcase, FiGrid, FiUsers, FiArrowRight } from "react-icons/fi";
import bgImage from "../assets/52231.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const BluishTalentLanding = () => {
  const textRef = useRef(null);
  const cardRef = useRef(null);

  const textInView = useInView(textRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardRef, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "Post a job and hire a pro",
      desc: "Talent Marketplace™",
      icon: <FiBriefcase size={30} />,
    },
    {
      title: "Browse and buy projects",
      desc: "Project Catalog™",
      icon: <FiGrid size={30} />,
    },
    {
      title: "Get advice from an industry expert",
      desc: "Consultations",
      icon: <FiUsers size={30} />,
    },
  ];

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center p-6 rounded-3xl"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0 rounded-3xl"></div>

      {/* Header */}
      <motion.div
        ref={textRef}
        className="relative z-10 w-full max-w-7xl grid md:grid-cols-2 gap-8 items-center p-10"
        variants={fadeInUp}
        initial="hidden"
        animate={textInView ? "visible" : "hidden"}
      >
        <div className="space-y-6 text-white text-left">
          <div className="uppercase font-semibold text-gray-300 text-sm">For clients</div>
          <h1 className="text-5xl font-bold leading-tight">
            Find talent <br /> your way
          </h1>
          <p className="text-lg text-gray-200">
            Work with the largest network of independent professionals and get things done — from quick turnarounds to big transformations.
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        ref={cardRef}
        className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl"
        variants={fadeInUp}
        initial="hidden"
        animate={cardsInView ? "visible" : "hidden"}
      >
        {cards.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover="hover"
            initial="rest"
            animate="rest"
            variants={{
              rest: { backgroundColor: "#3B82F6", color: "#ffffff" },
              hover: {
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: { duration: 0.4, ease: "easeInOut" },
              },
            }}
            className="rounded-xl p-6 shadow-md cursor-pointer flex flex-col gap-3 transition-colors duration-300"
          >
            <div className="text-2xl">{item.icon}</div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.desc}</p>
            <motion.div
              className="mt-2 flex items-center gap-1 font-medium"
              variants={{
                rest: { x: 0 },
                hover: {
                  x: 8,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                },
              }}
            >
              <span>Learn More</span>
              <motion.span>
                <FiArrowRight />
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BluishTalentLanding;
