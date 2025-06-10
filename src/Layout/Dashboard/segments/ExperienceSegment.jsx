import React from "react";
import { FaPlus, FaTrash, FaBuilding } from "react-icons/fa";

const ExperienceSegment = ({
  experience,
  handleExpChange,
  handleAddExp,
  handleRemoveExp,
}) => (
  <div className="shadow-xl rounded-2xl p-6 bg-orange-50">
    <div className="flex justify-between items-center mb-2">
      <label className="text-xs text-gray-600 font-semibold flex items-center gap-2">
        <FaBuilding /> Experience
      </label>
      <button
        type="button"
        className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        onClick={handleAddExp}
      >
        <FaPlus /> Add Experience
      </button>
    </div>
    <div className="space-y-2">
      {(experience || []).map((ex, idx) => (
        <div key={idx} className="flex flex-col gap-2 mb-2">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <input
              type="text"
              value={ex.role}
              placeholder="Role/Title"
              onChange={(e) => handleExpChange(idx, "role", e.target.value)}
              className="w-full md:w-1/4 px-3 py-1.5 border border-blue-200 rounded bg-white"
            />
            <input
              type="text"
              value={ex.company}
              placeholder="Company"
              onChange={(e) => handleExpChange(idx, "company", e.target.value)}
              className="w-full md:w-1/4 px-3 py-1.5 border border-blue-200 rounded bg-white"
            />
            <input
              type="text"
              value={ex.duration}
              placeholder="Duration"
              onChange={(e) => handleExpChange(idx, "duration", e.target.value)}
              className="w-full md:w-1/6 px-3 py-1.5 border border-blue-200 rounded bg-white"
            />
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveExp(idx)}
              title="Remove experience"
            >
              <FaTrash />
            </button>
          </div>
          <input
            type="text"
            value={ex.description}
            placeholder="Description"
            onChange={(e) => handleExpChange(idx, "description", e.target.value)}
            className="w-full px-3 py-1.5 border border-blue-200 rounded bg-white"
          />
        </div>
      ))}
    </div>
  </div>
);

export default ExperienceSegment;