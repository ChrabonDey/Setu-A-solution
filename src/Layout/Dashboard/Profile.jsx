import { useContext, useEffect, useState } from "react";
import { authContext } from "../../provider/Authprovider";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaAward,
  FaUserTie,
  FaBriefcase,
  FaStar,
  FaEye,
  FaThumbsUp,
  FaGraduationCap,
  FaShareAlt,
  FaBuilding
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import EditProfile from "./EditProfile";

// Added experience array to DEMO_PROFILE
const DEMO_PROFILE = {
  firstName: "Shamim",
  lastName: "Kabir Kazim",
  username: "shamimkabir",
  Email: "shamim.kabir@email.com",
  phone: "+1 (555) 123-4567",
  city: "Dhaka, Bangladesh",
  facebook: "https://facebook.com/shamimkabir",
  twitter: "https://twitter.com/shamimkabir",
  linkedin: "https://linkedin.com/in/shamimkabir",
  youtube: "",
  pinterest: "",
  about:
    "Creative developer and enthusiastic client, passionate about building meaningful connections and robust digital solutions. Experienced in both hiring talent and delivering freelance excellence.",
  skills: [
    { name: "JavaScript", level: 92 },
    { name: "React.js", level: 88 },
    { name: "Node.js", level: 80 },
    { name: "UI/UX Design", level: 78 },
    { name: "Team Management", level: 85 },
    { name: "Communication", level: 95 },
  ],
  education: [
    {
      institute: "Bangladesh University of Engineering and Technology",
      degree: "B.Sc. in Computer Science & Engineering",
      year: "2014 - 2018",
    },
    {
      institute: "Harvard University",
      degree: "M.Sc. in Project Management",
      year: "2020 - 2022",
    },
  ],
  experience: [
    {
      company: "Google",
      role: "Frontend Developer",
      duration: "2019 - 2021",
      description: "Worked on scalable React UI for Google Ads platform."
    },
    {
      company: "Microsoft",
      role: "Full Stack Engineer",
      duration: "2021 - 2023",
      description: "Led cross-platform web application projects for Azure."
    }
  ],
  interests: ["Collaboration", "Web Apps", "Startups", "Learning", "AI"],
  exp_years: 8,
  reward: 15,
  awards: 5,
  profileRating: 4.9,
  profileViews: 672,
  profileLikes: 154,
  address: "House 15, Road 10, Dhanmondi, Dhaka, Bangladesh",
  photoURL: "https://i.postimg.cc/3RycpTtm/photo-6287455229830086616-y.jpg",
};

const Profile = () => {
  const { user, loading } = useContext(authContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setProfile(DEMO_PROFILE);
  }, [user]);

  const handleProfileSave = (newProfile) => {
    setProfile(newProfile);
    setEditing(false);
  };

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (editing) {
    return <EditProfile profile={profile} onSubmit={handleProfileSave} />;
  }

  // Color mapping for skill bars
  const getColorByIndex = (i) => {
    const colors = ["blue", "red", "green", "orange", "teal", "purple"];
    return colors[i % colors.length];
  };

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen profile-bg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-xl p-6 text-center border border-blue-100 relative">
          {/* Profile Photo */}
          <div className="relative flex flex-col items-center mt-2">
            <img
              src={profile.photoURL}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
            />
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-gray-800 tracking-wide">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-blue-400 font-semibold mb-2">@{profile.username}</p>
          {/* Edit & Share icons below @username, above separator */}
          <div className="w-full flex justify-center gap-3 mb-4">
            <button
              title="Edit Profile"
              className="bg-white hover:bg-blue-50 border border-blue-100 shadow p-2 rounded-full transition"
              onClick={() => setEditing(true)}
            >
              <MdEdit className="text-blue-600" size={20} />
            </button>
            <button
              title="Share Profile"
              className="bg-white hover:bg-blue-50 border border-blue-100 shadow p-2 rounded-full transition"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Profile of " + profile.firstName,
                    text: "Check out this profile!",
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Profile link copied to clipboard!");
                }
              }}
            >
              <FaShareAlt className="text-blue-600" size={18} />
            </button>
          </div>
          {/* Separator below icons */}
          <div className="w-2/3 mx-auto border-b-2 border-blue-100 mb-4"></div>
          <div className="flex flex-col items-center gap-2 text-gray-600 mb-3">
            <p className="flex items-center gap-2 text-sm">
              <FaEnvelope className="text-blue-400" /> {profile.Email}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaPhone className="text-green-400" /> {profile.phone}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt className="text-orange-400" /> {profile.city}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-700">Address:</span>
              <span>{profile.address}</span>
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-2xl text-blue-600">
            {profile.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer"><FaFacebook className="hover:text-blue-700 transition" /></a>}
            {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer"><FaTwitter className="hover:text-sky-400 transition" /></a>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin className="hover:text-blue-600 transition" /></a>}
            {profile.youtube && <a href={profile.youtube} target="_blank" rel="noreferrer"><FaYoutube className="hover:text-red-500 transition" /></a>}
            {profile.pinterest && <a href={profile.pinterest} target="_blank" rel="noreferrer"><FaPinterest className="hover:text-red-400 transition" /></a>}
          </div>
          {/* User Type Badges */}
          <div className="flex justify-center gap-2 mt-6">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold shadow">
              <FaUserTie className="mr-1" /> Client
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold shadow">
              <FaBriefcase className="mr-1" /> Freelancer
            </span>
          </div>
          {/* Profile Stats */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            <div className="bg-blue-100 text-blue-800 px-2 py-4 rounded-lg shadow text-center">
              <FaAward className="mx-auto mb-1 text-lg" />
              <p className="text-lg font-bold">{profile.awards}+</p>
              <p className="text-xs font-semibold">Awards</p>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-4 rounded-lg shadow text-center">
              <FaBriefcase className="mx-auto mb-1 text-lg" />
              <p className="text-lg font-bold">{profile.exp_years || 0}+</p>
              <p className="text-xs font-semibold">Experience</p>
            </div>
            <div className="bg-orange-100 text-orange-800 px-2 py-4 rounded-lg shadow text-center">
              <FaUserTie className="mx-auto mb-1 text-lg" />
              <p className="text-lg font-bold">{profile.reward || 0}+</p>
              <p className="text-xs font-semibold">Participated</p>
            </div>
          </div>
          {/* Profile Social Stats */}
          <div className="flex justify-between items-center mt-6 px-5">
            <div className="flex flex-col items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">{profile.profileRating || 4.9}</span>
              <span className="text-xs text-gray-400">Rating</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FaEye className="text-blue-400" />
              <span className="text-sm font-semibold text-gray-700">{profile.profileViews || 0}</span>
              <span className="text-xs text-gray-400">Views</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FaThumbsUp className="text-green-400" />
              <span className="text-sm font-semibold text-gray-700">{profile.profileLikes || 0}</span>
              <span className="text-xs text-gray-400">Likes</span>
            </div>
          </div>
        </div>
        {/* Details Card */}
        <div className="col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-blue-50">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">About Me</h2>
          <hr className="mb-3 border-blue-100" />
          <p className="text-gray-600 mb-8 min-h-[48px]">{profile.about || "Tell us something about yourself."}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skills */}
            <div>
              <h3 className="font-semibold text-lg text-blue-700 mb-3">Skills</h3>
              <div className="space-y-4">
                {profile.skills?.length ? (
                  profile.skills.map((skill, i) => (
                    <SkillBar
                      key={i}
                      label={skill.name}
                      value={skill.level}
                      color={getColorByIndex(i)}
                    />
                  ))
                ) : (
                  <p className="text-gray-400">No skills added yet.</p>
                )}
              </div>
            </div>
            {/* Education */}
            <div>
              <h3 className="font-semibold text-lg text-blue-700 mb-3 flex items-center gap-2">
                <FaGraduationCap /> Education
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 text-gray-700 font-medium space-y-3">
                {profile.education && profile.education.length > 0 ? (
                  profile.education.map((ed, i) => (
                    <div key={i} className="mb-2">
                      <div className="font-semibold">{ed.degree}</div>
                      <div className="text-sm">{ed.institute}</div>
                      <div className="text-xs text-gray-400">{ed.year}</div>
                    </div>
                  ))
                ) : (
                  <p>No education information provided.</p>
                )}
              </div>
            </div>
          </div>
          {/* Experience */}
          <div className="mt-10">
            <h3 className="font-semibold text-lg text-blue-700 mb-3 flex items-center gap-2">
              <FaBuilding /> Experience
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 text-gray-700 font-medium space-y-3">
              {profile.experience && profile.experience.length > 0 ? (
                profile.experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{exp.role}</span>
                      <span className="text-xs text-gray-400">{exp.duration}</span>
                    </div>
                    <div className="text-sm">{exp.company}</div>
                    <div className="text-xs text-gray-500">{exp.description}</div>
                  </div>
                ))
              ) : (
                <p>No experience information provided.</p>
              )}
            </div>
          </div>
          {/* Interests (optional) */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg text-blue-700 mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((it, i) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold shadow"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Skill Bar Component with animation and improved style
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
    <div className="mb-2">
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${colorMap[color]} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;