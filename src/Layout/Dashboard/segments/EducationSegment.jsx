import React from "react";
import { FaGraduationCap, FaPlus, FaTrash } from "react-icons/fa";

const EducationSegment = ({
  education,
  handleEducationChange,
  handleAddEducation,
  handleRemoveEducation,
}) => (
  <div className="shadow-xl rounded-2xl p-6 bg-pink-50">
    <div className="flex justify-between items-center mb-2">
      <label className="text-xs text-gray-600 font-semibold flex items-center gap-2">
        <FaGraduationCap /> Education
      </label>
      <button
        type="button"
        className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        onClick={handleAddEducation}
      >
        <FaPlus /> Add Education
      </button>
    </div>
    <div className="space-y-2">
      {education.map((ed, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-2 items-center">
          <input
            type="text"
            value={ed.degree}
            placeholder="Degree"
            onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
            className="w-full md:w-1/3 px-3 py-1.5 border border-blue-200 rounded bg-white"
          />
          <input
            type="text"
            value={ed.institute}
            placeholder="Institute"
            onChange={(e) => handleEducationChange(idx, "institute", e.target.value)}
            className="w-full md:w-1/3 px-3 py-1.5 border border-blue-200 rounded bg-white"
          />
          <input
            type="text"
            value={ed.year}
            placeholder="Year"
            onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
            className="w-full md:w-1/4 px-3 py-1.5 border border-blue-200 rounded bg-white"
          />
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => handleRemoveEducation(idx)}
            title="Remove education"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default EducationSegment;