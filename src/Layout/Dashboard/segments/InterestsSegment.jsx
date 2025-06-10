import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const InterestsSegment = ({ interests = [], setInterests }) => {
  const [interestInput, setInterestInput] = useState("");

  const handleInputChange = (e) => setInterestInput(e.target.value);

  const handleInputKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && interestInput.trim()) {
      e.preventDefault();
      if (
        !interests
          .map((it) => it.toLowerCase())
          .includes(interestInput.trim().toLowerCase())
      ) {
        setInterests([...interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (idx) => {
    setInterests(interests.filter((_, i) => i !== idx));
  };

  return (
    <div className="shadow-xl rounded-2xl p-6 bg-indigo-50">
      <div className="mb-2">
        <label className="text-xs text-gray-600 font-semibold">Interests</label>
      </div>
      {/* Tag input */}
      <div className="mb-3 flex flex-wrap gap-2">
        {interests.map((it, idx) => (
          <span
            key={idx}
            className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow gap-1"
          >
            {it}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              title="Remove interest"
              onClick={() => handleRemoveInterest(idx)}
            >
              <FaTimes className="text-blue-400 hover:text-red-600 text-xs" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={interestInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
        placeholder="Type interest and press Enter"
      />
    </div>
  );
};

export default InterestsSegment;