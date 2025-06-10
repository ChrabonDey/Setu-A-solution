import React from "react";

const AboutSegment = ({ about, handleChange }) => (
  <div className="shadow-xl rounded-2xl p-6 bg-teal-50">
    <label className="text-xs text-gray-600 font-semibold">About Me</label>
    <textarea
      name="about"
      rows={3}
      value={about}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
    />
  </div>
);

export default AboutSegment;