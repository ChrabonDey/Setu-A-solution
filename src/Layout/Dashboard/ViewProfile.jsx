import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaPinterest } from "react-icons/fa";

const ViewProfile = () => {
  const { email } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getColorByIndex = (i) => {
    const colors = ["blue", "red", "green", "orange", "teal", "purple"];
    return colors[i % colors.length];
  };

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/profile-data?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [email]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  if (!profile?.Email) {
    return <p className="text-center mt-10 text-red-500">Profile not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <img
            src={profile.photoURL || "/default-user.png"}
            alt="User"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-400"
          />
          <h2 className="text-xl font-semibold mt-4">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-500">{profile.username}</p>
          <div className="mt-3 text-left space-y-2">
            <p><strong>Email:</strong> {profile.Email}</p>
            <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
            <p><strong>Location:</strong> {profile.city || "N/A"}</p>
          </div>

          <div className="flex justify-center gap-4 mt-4 text-xl text-blue-600">
            {profile.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>}
            {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
            {profile.youtube && <a href={profile.youtube} target="_blank" rel="noreferrer"><FaYoutube /></a>}
            {profile.pinterest && <a href={profile.pinterest} target="_blank" rel="noreferrer"><FaPinterest /></a>}
          </div>
        </div>

        {/* Details */}
        <div className="col-span-2 bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">About</h3>
          <p className="text-gray-700 mb-4">{profile.about}</p>

          <h3 className="font-semibold text-lg mb-2">Skills</h3>
          <div className="space-y-3 mb-6">
            {profile.skills?.map((skill, i) => (
              <SkillBar
                key={i}
                label={skill.name}
                value={skill.level}
                color={getColorByIndex(i)}
              />
            ))}
          </div>

          <h3 className="font-semibold text-lg mb-2">Education</h3>
          <p className="bg-gray-100 p-3 rounded">{profile.education}</p>
        </div>
      </div>
    </div>
  );
};

// Skill bar component
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
    <div>
      <div className="flex justify-between text-sm text-gray-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
        <div className={`${colorMap[color]} h-3 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

export default ViewProfile;
