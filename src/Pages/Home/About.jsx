import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import img1 from "../../assets/ChatGPT Image Apr 30, 2025, 09_15_49 PM.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const zoomIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const About = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  return (
    <div className="py-20 bg-white" ref={aboutRef}>
      <div className="sm:flex items-center max-w-screen-xl mx-auto px-6">
        
        {/* Text Section */}
        <motion.div
          className="sm:w-1/2 p-10"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="text-gray-500 border-b-2 border-[#006dc7] uppercase text-sm tracking-wider">
            About us
          </span>
          <h2 className="my-4 font-bold text-4xl sm:text-5xl">
            About <span className="text-[#006dc7]">Our Company</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are passionate about empowering students and professionals through innovative projects,
            seamless development, and a collaborative mindset. Discover how we make ideas come alive.
          </p>
        </motion.div>

        {/* Image Section with Bounce Hover */}
        <motion.div
          className="sm:w-1/2 p-5 flex justify-center"
          variants={zoomIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.img
            src={img1}
            alt="Setu"
            className="rounded-full shadow-xl w-80 h-80 object-cover border-4 border-[#006dc7]"
            whileHover={{
              scale: 1.05,
              rotate: [0, 4, -4, 3, -3, 0],
              transition: {
                duration: 0.8,
                type: "spring",
                stiffness: 180,
                damping: 10,
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
