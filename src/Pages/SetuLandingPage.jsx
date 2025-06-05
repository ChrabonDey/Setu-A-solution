import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1748605219869.json";
import { Briefcase, Users, DollarSign } from "lucide-react";
import { Helmet } from "react-helmet";

const SetuLandingPage = () => {
  return (
<div className="w-[99%] max-w-full bg-gradient-to-br from-indigo-300 via-white to-amber-300 py-8 rounded-2xl mx-auto">

      <Helmet>
        <title>Setu – Smart Hiring Platform</title>
        <meta
          name="description"
          content="Hire top freelancers and developers instantly with Setu. No barriers. Transparent. Fast."
        />
      </Helmet>

      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-auto">
        {/* Left Animation */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full max-w-sm mx-auto"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-center md:text-left px-4"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-5xl font-semibold text-indigo-900 leading-tight mb-6"
            style={{ fontFamily: "Inter, Arial, sans-serif" }}
          >
            Make your next hire the smart way with — <br />
            <span className="text-amber-400">Setu</span>
          </h1>

          <div className="space-y-6 text-gray-700 text-lg">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <Users className="text-amber-500 mt-1" size={24} />
              <div>
                <p className="text-indigo-900 font-medium">Zero Entry Barriers</p>
                <p>Connect with top freelancers instantly, no upfront costs required.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 justify-center md:justify-start">
              <Briefcase className="text-amber-500 mt-1" size={24} />
              <div>
                <p className="text-indigo-900 font-medium">Find Talent Effortlessly</p>
                <p>Post jobs and link with skilled professionals to bring your vision to life.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 justify-center md:justify-start">
              <DollarSign className="text-amber-500 mt-1" size={24} />
              <div>
                <p className="text-indigo-900 font-medium">Affordable Excellence</p>
                <p>Transparent pricing to kickstart your projects without breaking the bank.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sign up for Setu"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all text-lg"
            >
              Sign Up — Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#eef1ff" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Learn how Setu helps"
              className="border-2 border-amber-500 text-amber-500 font-medium px-8 py-4 rounded-xl transition-all text-lg"
            >
              Discover Setu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SetuLandingPage;
