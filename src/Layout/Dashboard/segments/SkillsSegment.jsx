import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function SkillsSegment({ form, setForm }) {
  // Defensive: always use an array
  const skills = form.skills || [];

  // Add skill
  const handleAddSkill = () => {
    setForm((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), { name: "", level: 0 }],
    }));
  };

  // Remove skill
  const handleRemoveSkill = (idx) => {
    setForm((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== idx),
    }));
  };

  // Edit skill
  const handleSkillChange = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      skills: (prev.skills || []).map((s, i) =>
        i === idx ? { ...s, [field]: field === "level" ? parseInt(value, 10) : value } : s
      ),
    }));
  };

  return (
    <div className="shadow-xl rounded-2xl p-6 bg-yellow-50">
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
        {skills.map((skill, idx) => (
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
  );
}