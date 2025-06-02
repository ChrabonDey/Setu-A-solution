import { useContext, useEffect, useState } from "react";
import { authContext } from "../../provider/Authprovider";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaPinterest } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  const { user ,loading} = useContext(authContext);
  const [profile, setProfile] = useState(null);
   

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">User not found. Please log in.</p>
      </div>
    );
  }

  const getColorByIndex = (i) => {
    const colors = ["blue", "red", "green", "orange", "teal", "purple"];
    return colors[i % colors.length];
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/Profile-data?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setProfile(data));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {profile ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-1 bg-white rounded-xl shadow p-6 text-center">
            <div className="relative inline-block">
            {user?.photoURL ? (
  <img
    src={user.photoURL}
    alt="User Avatar"
    className="w-24 h-24 rounded-full border-4 border-blue-500"
  />
) : (
  <div className="w-24 h-24 rounded-full border-4 border-blue-500 bg-gray-200 flex items-center justify-center">
    <span className="text-gray-500 text-xl font-semibold">N/A</span>
  </div>
)}

                
              <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                <MdEdit className="text-blue-500" size={20} />
              </span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-500 mb-4">{profile.username}</p>

            <div className="text-left space-y-3">
              <p><strong>Email:</strong> {profile.Email}</p>
              <p><strong>Phone:</strong> {profile.phone || "(123) 123 1234"}</p>
              <p><strong>Location:</strong> {profile.city || "USA"}</p>
            </div>

            <div className="flex justify-center gap-4 mt-4 text-xl text-blue-600">
              {profile.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>}
              {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
              {profile.youtube && <a href={profile.youtube} target="_blank" rel="noreferrer"><FaYoutube /></a>}
              {profile.pinterest && <a href={profile.pinterest} target="_blank" rel="noreferrer"><FaPinterest /></a>}
            </div>

            {/* Stats */}
            <div className="mt-6 space-y-4">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold">42+</p>
                <p className="text-sm">Awards</p>
              </div>
              <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold">{profile.experience}+ years</p>
                <p className="text-sm">Experience</p>
              </div>
              <div className="bg-orange-100 text-orange-800 p-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold">{profile.reward}+</p>
                <p className="text-sm">Participated</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">About Me</h2>
            <p className="text-gray-600 mb-6">{profile.about}</p>

            {/* Skills Section */}
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Skills</h3>
            <div className="mb-6 space-y-3">
              {profile.skills?.map((skill, i) => (
                <SkillBar
                  key={i}
                  label={skill.name}
                  value={skill.level}
                  color={getColorByIndex(i)}
                />
              ))}
            </div>

            {/* Education */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Education</h3>
              <textarea
                className="w-full bg-gray-100 p-3 rounded"
                rows={3}
                value={profile.education}
                readOnly
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center mt-10">Loading profile...</p>
      )}
    </div>
  );
};

// Skill Bar Component
const SkillBar = ({ label, value, color }) => {
  const colorMap = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className={`${colorMap[color]} h-3 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;
