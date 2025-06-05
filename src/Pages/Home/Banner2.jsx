import React from "react";
import { FaCheckCircle, FaClipboardList, FaUserShield } from "react-icons/fa";

const Banner2 = () => {
  return (
    <section className="w-full flex flex-col items-center py-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-[95%] max-w-5xl rounded-2xl flex flex-col items-center p-6 gap-6 shadow-lg border border-blue-100 bg-white">
        {/* Card Section */}
        <div className="w-full flex justify-center min-w-[280px] transform hover:scale-105 transition-transform duration-300">
          <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-5 w-[280px] min-h-[200px] flex flex-col border border-blue-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-200 to-blue-100 flex items-center justify-center text-xl font-bold text-blue-800 ring-2 ring-blue-300 shadow">
                F
              </div>
              <div className="ml-3 flex-1">
                <div className="h-2 w-16 bg-blue-100 rounded mb-1"></div>
                <div className="h-2 w-12 bg-blue-50 rounded"></div>
              </div>
            </div>
            <span className="inline-block bg-blue-500 text-white text-xs px-2.5 py-1 rounded-full mb-2 w-fit font-medium tracking-wide shadow">
              In progress
            </span>
            <div className="text-blue-900 font-semibold text-sm mb-4">
              Frances submitted work for review
            </div>
            <button className="mt-auto bg-blue-500 text-white rounded-lg py-2 font-medium text-sm shadow hover:bg-blue-600 transition w-full">
              Review work
            </button>
            <span
              className="absolute -right-6 bottom-0 text-6xl select-none pointer-events-none text-blue-200"
              title="Thumbs Up"
              aria-label="Thumbs Up"
              style={{ zIndex: 10 }}
            >
              👍
            </span>
            <span className="absolute right-4 top-12 text-yellow-300 text-lg select-none">✦</span>
          </div>
        </div>
        {/* Text Content Section */}
        <div className="w-full flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-5 leading-tight tracking-tight" style={{ fontFamily: "Inter, Arial, sans-serif" }}>
            Boost your workflow with SETU
          </h2>
          <ul className="space-y-4 mb-6 w-full max-w-md">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-xl text-blue-500">
                <FaClipboardList />
              </span>
              <div className="text-left">
                <div className="font-medium text-sm text-blue-900">Zero joining fees</div>
                <div className="text-gray-500 text-sm">
                  Instantly access our talent marketplace, explore projects, or book consultations—no cost, no catch.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-xl text-blue-500">
                <FaCheckCircle />
              </span>
              <div className="text-left">
                <div className="font-medium text-sm text-blue-900">Post jobs & hire in minutes</div>
                <div className="text-gray-500 text-sm">
                  Create your job post and connect with top talent, or let us help you find the right fit.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-xl text-blue-500">
                <FaUserShield />
              </span>
              <div className="text-left">
                <div className="font-medium text-sm text-blue-900">Work smart, spend less</div>
                <div className="text-gray-500 text-sm">
                  SETU keeps your costs low so you can focus on results with transparent pricing and minimal fees.
                </div>
              </div>
            </li>
          </ul>
          <div className="flex gap-3 flex-wrap justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-2 text-sm transition shadow-md">
              Sign up for free
            </button>
            <button className="border-2 border-blue-500 text-blue-500 font-medium rounded-lg px-6 py-2 text-sm transition hover:bg-blue-50">
              Learn how to hire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner2;