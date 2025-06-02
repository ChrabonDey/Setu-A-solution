import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1748605219869.json";
import { Briefcase, Users, DollarSign } from "lucide-react";
import { Helmet } from "react-helmet";

const SetuLandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      {/* SEO Head Tags */}
      <Helmet>
        <title>Setu – Smart Hiring Platform</title>
        <meta
          name="description"
          content="Hire top freelancers and developers instantly with Setu. No barriers. Transparent. Fast."
        />
      </Helmet>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Animation */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full max-w-md mx-auto"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Make your next hire the smart way —
            <br />
            with <span className="text-[#4343e5]">Setu</span>
          </h1>

          <div className="space-y-6 text-gray-700 text-base">
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <Users className="text-[#4343e5] mt-1" size={20} />
              <div>
                <strong>No barriers to begin</strong>
                <br />
                Explore talented freelancers and developers without any upfront costs.
              </div>
            </div>

            <div className="flex items-start gap-3 justify-center md:justify-start">
              <Briefcase className="text-[#4343e5] mt-1" size={20} />
              <div>
                <strong>Post your job, find talent</strong>
                <br />
                Setu bridges the gap between your idea and the people who can build it.
              </div>
            </div>

            <div className="flex items-start gap-3 justify-center md:justify-start">
              <DollarSign className="text-[#4343e5] mt-1" size={20} />
              <div>
                <strong>Smart hiring without overspending</strong>
                <br />
                Transparent and affordable hiring to get your project moving fast.
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              aria-label="Sign up for Setu"
              className="bg-[#4343e5] hover:bg-[#3333cc] text-white font-semibold px-6 py-3 rounded-xl shadow transition-all"
            >
              Sign up — it’s free
            </button>
            <button
              aria-label="Learn how Setu helps"
              className="border border-[#4343e5] text-[#4343e5] hover:bg-[#eef1ff] font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Learn how Setu helps
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SetuLandingPage;
