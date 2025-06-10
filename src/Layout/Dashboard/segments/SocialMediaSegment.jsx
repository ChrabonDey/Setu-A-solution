import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

const SocialMediaSegment = ({ form, handleChange }) => (
  <div className="shadow-xl rounded-2xl p-6 bg-green-50">
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaFacebook /> Facebook</label>
        <input
          type="text"
          name="facebook"
          value={form.facebook}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
        />
      </div>
      <div>
        <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaTwitter /> Twitter</label>
        <input
          type="text"
          name="twitter"
          value={form.twitter}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
        />
      </div>
      <div>
        <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaLinkedin /> LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
        />
      </div>
      <div>
        <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaYoutube /> YouTube</label>
        <input
          type="text"
          name="youtube"
          value={form.youtube}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
        />
      </div>
      <div>
        <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaPinterest /> Pinterest</label>
        <input
          type="text"
          name="pinterest"
          value={form.pinterest}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
        />
      </div>
    </div>
  </div>
);

export default SocialMediaSegment;