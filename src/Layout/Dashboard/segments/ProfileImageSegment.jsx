import React, { useRef } from "react";
import { FaImage } from "react-icons/fa";

const ProfileImageSegment = ({ photoURL, setPhotoURL }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhotoURL(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="shadow-xl rounded-2xl flex flex-col items-center justify-center p-6 bg-blue-50">
      <img
        src={photoURL}
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
  );
};

export default ProfileImageSegment;