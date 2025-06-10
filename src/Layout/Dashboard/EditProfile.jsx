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
  FaImage,
  FaBuilding,
  FaTimes,
  FaStar,
  FaArrowLeft,
  FaSave
} from "react-icons/fa";

// Colors
const segmentBgColor = "bg-[#ecf8fd]";
const usernameTextColor = "text-green-700";
const cartoonBorderColor = "border-[#b6e0fa]"; // light blue border for avatars

const cartoonAvatars = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Anna",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Max",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Mia",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
];

const segmentBg = Array(8).fill(segmentBgColor);

const smallBtnStyle =
  "flex items-center justify-center gap-1 px-3 h-[30px] rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-800 shadow transition text-xs whitespace-nowrap";

const SkillPercentInput = ({ value, onChange }) => (
  <div className="relative w-16">
    <input
      type="number"
      min={0}
      max={100}
      value={value}
      onChange={onChange}
      className="w-full pr-6 pl-2 py-1.5 border border-blue-200 rounded bg-white text-right text-sm"
      style={{ appearance: "textfield" }}
    />
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 text-xs pointer-events-none select-none">%</span>
  </div>
);

const EditProfile = ({ profile, onSubmit, onBack }) => {
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

  // --- Cartoon avatar selection handler ---
  const handleCartoonAvatarSelect = (url) => {
    setForm((prev) => ({ ...prev, photoURL: url }));
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
  const handleAddInterest = () => {
    if (interestInput.trim()) {
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
  const handleInterestInputKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && interestInput.trim()) {
      e.preventDefault();
      handleAddInterest();
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
    // Go back to profile view after saving (handled in Profile.jsx via onSubmit)
  };

  // --- Back handler: go to profile content area (not navigation!)
  const handleBack = (e) => {
    e.preventDefault();
    if (onBack) onBack();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-transparent pt-[10px] pb-10 px-4
">
      {/* Top Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between px-4 md:px-10 mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
          title="Back"
        >
          <FaArrowLeft size={22} />
        </button>
        <button
          type="submit"
          form="edit-profile-form"
          className="flex items-center gap-2 px-6 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-800 shadow transition"
        >
          <FaSave /> Save
        </button>
      </div>
      <form
        id="edit-profile-form"
        onSubmit={handleSubmit}
        className="w-full max-w-7xl grid gap-6 p-4 md:pt-4 md:pb-10 pt-2 pb-6"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(7, minmax(95px, auto))",
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
          <div className="relative flex flex-col items-center w-full">
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
              <FaImage className="inline mr-2" size={14} /> Choose
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
            {/* Username Input Area and label */}
            <div className="w-full mt-4 flex flex-col items-center" style={{ marginBottom: 10 }}>
              <label className="block text-xs text-gray-600 font-semibold mb-1 text-left w-full pl-2">Username</label>
              <div className="flex items-center w-full rounded-full px-3 py-2 border border-blue-200 bg-white">
                <span className={`font-bold select-none pr-1 ${usernameTextColor}`}>
                  @{form.username || ""}
                </span>
              </div>
              {/* Cartoon avatar choices */}
              <div className="flex flex-row gap-3 mt-4 justify-center w-full flex-wrap">
                {cartoonAvatars.map((url, i) => (
                  <button
                    type="button"
                    key={url}
                    className={`rounded-full border-4 ${cartoonBorderColor} ${form.photoURL === url ? "ring-2 ring-blue-400" : ""} p-1 hover:border-blue-400 transition`}
                    onClick={() => handleCartoonAvatarSelect(url)}
                    title={`Choose avatar ${i + 1}`}
                    tabIndex={0}
                  >
                    <img
                      src={url}
                      alt={`Avatar ${i + 1}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
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
              <label className="text-xs text-gray-600 font-semibold text-left block">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold text-left block">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold text-left block">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
                placeholder="Username"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold text-left block">Email</label>
              <input
                type="email"
                name="Email"
                value={form.Email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold flex items-center gap-1 text-left block"><FaPhone /> Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-semibold flex items-center gap-1 text-left block"><FaMapMarkerAlt /> City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-600 font-semibold flex items-center gap-1 text-left block">Address</label>
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
            <div>
              <button
                type="button"
                className={smallBtnStyle}
                onClick={handleAddSkill}
                title="Add Skill"
              >
                <FaPlus size={14} />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {form.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={skill.name}
                  placeholder="Skill"
                  onChange={e => handleSkillChange(idx, "name", e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-blue-200 rounded bg-white"
                />
                <SkillPercentInput
                  value={skill.level}
                  onChange={e => handleSkillChange(idx, "level", e.target.value)}
                />
                <button
                  type="button"
                  className="hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center w-[30px] h-[30px] rounded-full transition"
                  onClick={() => handleRemoveSkill(idx)}
                  title="Remove skill"
                >
                  <FaTimes size={16} />
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
            <div>
              <button
                type="button"
                className={smallBtnStyle}
                onClick={handleAddExp}
                title="Add Experience"
              >
                <FaPlus size={14} />
                <span>Add Experience</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {(form.experience || []).map((ex, idx) => (
              <div key={idx} className="flex flex-col gap-2 mb-2">
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <input
                    type="text"
                    value={ex.role}
                    placeholder="Role/Title"
                    onChange={e => handleExpChange(idx, "role", e.target.value)}
                    className="w-full md:w-1/4 px-3 py-1.5 border border-blue-200 rounded bg-white"
                  />
                  <input
                    type="text"
                    value={ex.company}
                    placeholder="Company"
                    onChange={e => handleExpChange(idx, "company", e.target.value)}
                    className="w-full md:w-1/4 px-3 py-1.5 border border-blue-200 rounded bg-white"
                  />
                  <input
                    type="text"
                    value={ex.duration}
                    placeholder="Duration"
                    onChange={e => handleExpChange(idx, "duration", e.target.value)}
                    className="w-full md:w-1/6 px-3 py-1.5 border border-blue-200 rounded bg-white"
                  />
                  <button
                    type="button"
                    className="hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center w-[30px] h-[30px] rounded-full transition"
                    onClick={() => handleRemoveExp(idx)}
                    title="Remove experience"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value={ex.description}
                  placeholder="Description"
                  onChange={e => handleExpChange(idx, "description", e.target.value)}
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
            gridColumn: "3 / 8",
            gridRow: "5 / 7",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-gray-600 font-semibold flex items-center gap-2"><FaGraduationCap /> Education</label>
            <div>
              <button
                type="button"
                className={smallBtnStyle}
                onClick={handleAddEducation}
                title="Add Education"
              >
                <FaPlus size={14} />
                <span>Add Education</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {form.education.map((ed, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-2 items-center">
                <input
                  type="text"
                  value={ed.degree}
                  placeholder="Degree"
                  onChange={e => handleEducationChange(idx, "degree", e.target.value)}
                  className="w-full md:w-1/3 px-3 py-1.5 border border-blue-200 rounded bg-white"
                />
                <input
                  type="text"
                  value={ed.institute}
                  placeholder="Institute"
                  onChange={e => handleEducationChange(idx, "institute", e.target.value)}
                  className="w-full md:w-1/3 px-3 py-1.5 border border-blue-200 rounded bg-white"
                />
                <input
                  type="text"
                  value={ed.year}
                  placeholder="Year"
                  onChange={e => handleEducationChange(idx, "year", e.target.value)}
                  className="w-full md:w-1/4 px-3 py-1.5 border border-blue-200 rounded bg-white"
                />
                <button
                  type="button"
                  className="hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center w-[30px] h-[30px] rounded-full transition"
                  onClick={() => handleRemoveEducation(idx)}
                  title="Remove education"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div
          className={`shadow-xl rounded-2xl p-6 flex flex-col ${segmentBg[7]} overflow-visible`}
          style={{
            gridColumn: "1 / 3",
            gridRow: "5 / 7",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <label className="text-xs text-gray-600 font-semibold text-left">Interests</label>
          </div>
          {/* Tag input */}
          <div className="mb-3 flex flex-wrap gap-2">
            {form.interests.map((it, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow gap-1"
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
          {/* Add Interest Button */}
          <div className="flex flex-row items-center gap-2 w-full">
            <div className="flex-1 flex">
              <input
                type="text"
                value={interestInput}
                onChange={handleInterestInputChange}
                onKeyDown={handleInterestInputKeyDown}
                className="w-full px-4 py-2 border border-blue-300 rounded-full bg-white"
                placeholder="Type interest"
                style={{ borderRadius: "9999px" }}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleAddInterest}
                className={smallBtnStyle}
                title="Add Interest"
                style={{ borderRadius: "9999px" }}
              >
                <FaPlus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions (hidden because now in top bar) */}
        <div
          className="hidden"
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