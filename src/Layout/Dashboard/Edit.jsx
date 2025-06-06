import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../provider/Authprovider';
import Swal from 'sweetalert2';

const Edit = () => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [level, setLevel] = useState("");
  const { user, loading } = useContext(authContext);
  const [formData, setFormData] = useState(null);

  // Fetch user profile data
useEffect(() => {
  if (user?.email) {
    fetch(`https://setu-backend-1slc.onrender.com/profile-data?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setFormData(data); // this now includes the _id
          setSkills(data.skills || []);
        }
      });
  }
}, [user]);


  const addSkill = () => {
    const name = inputValue.trim();
    const lvl = parseInt(level);
    if (!name || isNaN(lvl) || lvl < 1 || lvl > 100) return;

    const newSkill = { name, level: lvl };
    if (!skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      setSkills([...skills, newSkill]);
    }

    setInputValue("");
    setLevel("");
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const profileData = {
      firstName: form.first.value,
      lastName: form.last.value,
      username: form.user.value,
      Email: user.email,
      city: form.city.value,
      dob: form.date.value,
      gender: form.gender.value,
      status: form.status.value,
      skills: skills,
      experience: form.experience.value,
      reward: form.reward.value,
      education: form.education.value,
      about: form.about.value,
      facebook: form.facebook.value,
      twitter: form.twitter.value,
      linkedin: form.linkedin.value,
    };

  const method = formData?._id ? 'PATCH' : 'POST';
const url = formData?._id
  ? `https://setu-backend-1slc.onrender.com/profile-data/${formData._id}`
  : `https://setu-backend-1slc.onrender.com/profile-data`;


    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0 || data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Profile saved successfully!",
            icon: "success"
          });
        }
      })
      .catch(err => {
        console.error("Error saving profile:", err);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 shadow-xl rounded-lg overflow-hidden bg-white">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="absolute bottom-[-40px] left-6">
          {/* Profile Image */}
          <div className="relative w-24 h-24">
            <img
              src={user?.photoURL || 'https://i.ibb.co/2kR9Mw9/user.png'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs cursor-pointer">
              ✎
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Edit Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="first" type="text" defaultValue={formData?.firstName || ""} placeholder="First Name" className="input input-bordered w-full" />
          <input name="last" type="text" defaultValue={formData?.lastName || ""} placeholder="Last Name" className="input input-bordered w-full" />
          <input name="user" type="text" defaultValue={formData?.username || ""} placeholder="Username" className="input input-bordered w-full" />
          <input defaultValue={user?.email || ""} readOnly className="input input-bordered w-full" />
          <input name="city" type="text" defaultValue={formData?.city || ""} placeholder="City" className="input input-bordered w-full" />
          <input name="date" type="date" defaultValue={formData?.dob || ""} className="input input-bordered w-full" />

          <select name="gender" defaultValue={formData?.gender || ""} className="select select-bordered w-full">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select name="status" defaultValue={formData?.status || ""} className="select select-bordered w-full">
            <option>Single</option>
            <option>Married</option>
          </select>

          {/* Skills */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <div className="space-y-2 mb-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-100 text-purple-800 px-3 py-2 rounded">
                  <span>{skill.name} ({skill.level}%)</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-purple-500 hover:text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Skill Name (e.g., React)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <input
                type="number"
                className="input input-bordered w-24"
                placeholder="%"
                min={1}
                max={100}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-sm bg-purple-600 text-white"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
          </div>

          <input name="experience" type="text" placeholder="Experience (e.g., 5 Years)" className="input input-bordered w-full" />
          <input name="reward" type="text" placeholder="Reward" className="input input-bordered w-full" />
          <input name="education" type="text" placeholder="Education & Training" className="input input-bordered w-full" />
        </div>

        {/* About Section */}
        <div className="mt-4">
          <textarea
            name="about"
            defaultValue={formData?.about || ""}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="About You..."
          ></textarea>
        </div>

        {/* Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <input name="facebook" type="url" placeholder="Facebook URL" className="input input-bordered w-full" defaultValue={formData?.facebook || ""} />
          <input name="twitter" type="url" placeholder="Twitter URL" className="input input-bordered w-full" defaultValue={formData?.twitter || ""} />
          <input name="linkedin" type="url" placeholder="LinkedIn URL" className="input input-bordered w-full" defaultValue={formData?.linkedin || ""} />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button type="submit" className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 transition-transform">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
