import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../provider/Authprovider";
import { FaTimes, FaPlus } from "react-icons/fa";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";

const Post_Jobs = () => {
  const { user } = useContext(authContext);
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const salary = form.salary.value;
    const location = form.location.value;

    const jobData = {
      title,
      description,
      salary,
      location,
      skills,
      Name: user?.displayName || user?.name || "Anonymous",
      Image: user?.photoURL || "",
      Email: user?.email,
      timestamp: new Date(),
    };

    try {
      const res = await axiosPublic.post("/jobs", jobData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire("Success", "Job posted successfully!", "success");
        navigate("/dashboard/myProducts");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to post job", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-2xl backdrop-blur-md rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🚀 Post a New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="e.g., Frontend Developer"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Job Description</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-xl p-3 h-36 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Briefly describe the responsibilities and requirements"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="e.g., 50000"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Location</label>
            <input
              type="text"
              name="location"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="e.g., Remote / Dhaka"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Required Skills</label>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="e.g., React, Node.js"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <FaPlus /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition"
            >
              Submit Job 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post_Jobs;
