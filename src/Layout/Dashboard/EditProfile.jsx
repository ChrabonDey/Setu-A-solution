import React, { useState, useRef } from "react";
import ProfileImageSegment from "./segments/ProfileImageSegment";
import SocialMediaSegment from "./segments/SocialMediaSegment";
import NameSegment from "./segments/NameSegment";
import AboutSegment from "./segments/AboutSegment";
import SkillsSegment from "./segments/SkillsSegment";
import ExperienceSegment from "./segments/ExperienceSegment";
import EducationSegment from "./segments/EducationSegment";
import InterestsSegment from "./segments/InterestsSegment";

export default function EditProfile({ profile, onSubmit }) {
  const [form, setForm] = useState(profile);
  const [interestInput, setInterestInput] = useState("");
  const fileInputRef = useRef(null);

  // Handlers for interests as tags
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

  // Main submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

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
          style={{ gridColumn: "1 / 3", gridRow: "1 / 3", minHeight: 0, minWidth: 0 }}
        >
          <ProfileImageSegment
            form={form}
            setForm={setForm}
            fileInputRef={fileInputRef}
          />
        </div>

        {/* Social Media Segment */}
        <div
          style={{ gridColumn: "1 / 3", gridRow: "3 / 5", minHeight: 0, minWidth: 0 }}
        >
          <SocialMediaSegment form={form} setForm={setForm} />
        </div>

        {/* Name Segment */}
        <div
          style={{ gridColumn: "3 / 8", gridRow: "1 / 2", minHeight: 0, minWidth: 0 }}
        >
          <NameSegment form={form} setForm={setForm} />
        </div>

        {/* About Segment */}
        <div
          style={{ gridColumn: "3 / 8", gridRow: "2 / 3", minHeight: 0, minWidth: 0 }}
        >
          <AboutSegment form={form} setForm={setForm} />
        </div>

        {/* Skills Segment */}
        <div
          style={{ gridColumn: "3 / 5", gridRow: "3 / 5", minHeight: 0, minWidth: 0 }}
        >
          <SkillsSegment form={form} setForm={setForm} />
        </div>

        {/* Experience Segment */}
        <div
          style={{ gridColumn: "5 / 8", gridRow: "3 / 5", minHeight: 0, minWidth: 0 }}
        >
          <ExperienceSegment form={form} setForm={setForm} />
        </div>

        {/* Education Segment */}
        <div
          style={{ gridColumn: "3 / 5", gridRow: "5 / 7", minHeight: 0, minWidth: 0 }}
        >
          <EducationSegment form={form} setForm={setForm} />
        </div>

        {/* Interests Segment */}
        <div
          style={{ gridColumn: "5 / 8", gridRow: "5 / 7", minHeight: 0, minWidth: 0 }}
        >
          <InterestsSegment
            form={form}
            setForm={setForm}
            interestInput={interestInput}
            handleInterestInputChange={handleInterestInputChange}
            handleInterestInputKeyDown={handleInterestInputKeyDown}
            handleRemoveInterest={handleRemoveInterest}
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
}