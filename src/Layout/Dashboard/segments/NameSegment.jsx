import React from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const NameDetailsSegment = ({ form, handleChange }) => (
  <div className="shadow-xl rounded-2xl p-6 bg-yellow-50">
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
);

export default NameDetailsSegment;