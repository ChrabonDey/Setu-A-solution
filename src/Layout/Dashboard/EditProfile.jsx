import React, { useState, useRef } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPlus,
  FaTrash,
  FaImage,
  FaBuilding,
  FaTimes,
} from "react-icons/fa";

const segmentBg = [
  "bg-blue-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-teal-50",
  "bg-purple-50",
  "bg-orange-50",
  "bg-pink-50",
  "bg-indigo-50"
];

const EditProfile = ({ profile, onSubmit }) => {
  const [form, setForm] = useState(profile);
  const [interestInput, setInterestInput] = useState("");
  const fileInputRef = useRef(null);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // --- Image upload handler ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photoURL: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // --- Experience ---
  const handleExpChange = (idx, field, value) => {
    setForm((prev) => {
      const experience = prev.experience.map((ex, i) =>
        i === idx ? { ...ex, [field]: value } : ex
      );
      return { ...prev, experience };
    });
  };
  const handleAddExp = () => {
    setForm((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        { company: "", role: "", duration: "", description: "" }
      ]
    }));
  };
  const handleRemoveExp = (idx) => {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };

  // --- Skills ---
  const handleSkillChange = (idx, field, value) => {
    setForm((prev) => {
      const skills = prev.skills.map((s, i) =>
        i === idx ? { ...s, [field]: field === "level" ? parseInt(value, 10) : value } : s
      );
      return { ...prev, skills };
    });
  };
  const handleAddSkill = () => {
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", level: 0 }],
    }));
  };
  const handleRemoveSkill = (idx) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  // --- Education ---
  const handleEducationChange = (idx, field, value) => {
    setForm((prev) => {
      const education = prev.education.map((ed, i) =>
        i === idx ? { ...ed, [field]: value } : ed
      );
      return { ...prev, education };
    });
  };
  const handleAddEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, { institute: "", degree: "", year: "" }],
    }));
  };
  const handleRemoveEducation = (idx) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  // --- Interests as tags ---
  const handleInterestInputChange = (e) => setInterestInput(e.target.value);
  const handleInterestInputKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && interestInput.trim()) {
      e.preventDefault();
      if (
        !form.interests
          .map((it) => it.toLowerCase())
          .includes(interestInput.trim().toLowerCase())
      ) {
        setForm((prev) => ({
          ...prev,
          interests: [...prev.interests, interestInput.trim()],
        }));
      }
      setInterestInput("");
    }
  };
  const handleRemoveInterest = (idx) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== idx),
    }));
  };

  // --- Save ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  // Responsive grid for dashboard layout, no horizontal overflow
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-transparent py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-7xl grid gap-6 p-4 md:p-10"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(6, minmax(95px, auto))",
        }}
      >
        {/* Profile Image Segment */}
        <div
          className={`shadow-xl rounded-2xl flex flex-col items-center justify-center p-6 ${segmentBg[0]}`}
          style={{
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="relative flex flex-col items-center">
            <img
              src={form.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover shadow-lg mb-2"
            />
            <button
              type="button"
              className="mt-2 bg-blue-600 text-white rounded-md px-4 py-2 shadow hover:bg-blue-800 transition"
              onClick={() => fileInputRef.current.click()}
              title="Upload profile image"
            >
              <FaImage className="inline mr-2" /> Choose
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Social Links - below profile image, now vertical */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[1]}`}
          style={{
            gridColumn: "1 / 3",
            gridRow: "3 / 5",
            minHeight: 0,
            minWidth: 0,
          }}
        >
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

        {/* Name Segment (above About, at grid row 1/2) */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[2]}`}
          style={{
            gridColumn: "3 / 8",
            gridRow: "1 / 2",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold">Email</label>
              <input
                type="email"
                name="Email"
                value={form.Email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaPhone /> Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold flex items-center gap-1"><FaMapMarkerAlt /> City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-600 font-semibold flex items-center gap-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
          </div>
        </div>

        {/* About Segment (below name segment) */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[3]}`}
          style={{
            gridColumn: "3 / 8",
            gridRow: "2 / 3",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <label className="text-xs text-gray-600 font-semibold">About Me</label>
          <textarea
            name="about"
            rows={3}
            value={form.about}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
          />
        </div>

        {/* Skills */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[4]}`}
          style={{
            gridColumn: "3 / 5",
            gridRow: "3 / 5",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-gray-600 font-semibold">Skills</label>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
              onClick={handleAddSkill}
            >
              <FaPlus /> Add Skill
            </button>
          </div>
          <div className="space-y-2">
            {form.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={skill.name}
                  placeholder="Skill"
                  onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-blue-200 rounded bg-white"
                />
                <input
                  type="number"
                  value={skill.level}
                  min={0}
                  max={100}
                  placeholder="Level"
                  onChange={(e) => handleSkillChange(idx, "level", e.target.value)}
                  className="w-1/3 px-3 py-1.5 border border-blue-200 rounded bg-white"
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveSkill(idx)}
                  title="Remove skill"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[5]}`}
          style={{
            gridColumn: "5 / 8",
            gridRow: "3 / 5",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-gray-600 font-semibold flex items-center gap-2"><FaBuilding /> Experience</label>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
              onClick={handleAddExp}
            >
              <FaPlus /> Add Experience
            </button>
          </div>
          <div className="space-y-2">
            {(form.experience || []).map((ex, idx) => (
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

        {/* Education */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[6]}`}
          style={{
            gridColumn: "3 / 5",
            gridRow: "5 / 7",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-gray-600 font-semibold flex items-center gap-2"><FaGraduationCap /> Education</label>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
              onClick={handleAddEducation}
            >
              <FaPlus /> Add Education
            </button>
          </div>
          <div className="space-y-2">
            {form.education.map((ed, idx) => (
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

        {/* Interests */}
        <div
          className={`shadow-xl rounded-2xl p-6 ${segmentBg[7]}`}
          style={{
            gridColumn: "5 / 8",
            gridRow: "5 / 7",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="mb-2">
            <label className="text-xs text-gray-600 font-semibold">Interests</label>
          </div>
          {/* Tag input */}
          <div className="mb-3 flex flex-wrap gap-2">
            {form.interests.map((it, idx) => (
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
            onChange={handleInterestInputChange}
            onKeyDown={handleInterestInputKeyDown}
            className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
            placeholder="Type interest and press Enter"
          />
        </div>

        {/* Actions */}
        <div
          className="flex justify-end items-center mt-8 mb-2 col-span-7"
          style={{
            gridRow: "7",
            gridColumn: "1 / 8",
          }}
        >
          <button
            type="submit"
            className="px-7 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-800 shadow transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;