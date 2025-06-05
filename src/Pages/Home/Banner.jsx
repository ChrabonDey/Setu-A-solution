import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Banner = () => {
  return (
    <div className="relative w-[99%] h-[600px] mx-auto overflow-hidden rounded-xl">
      {/* Flipped Background Image */}
      <img
        src="https://i.postimg.cc/J453wzX7/1d480cce-533e-49d7-9c27-576d3810500a-upscaled.jpg"
        alt="Banner background"
        className="w-full h-full object-cover scale-x-[-1]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
        <div className="text-white px-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-left">
            Hire smart. <br />
            Work better.
          </h1>
          <p className="text-xl text-gray-200 mb-8 text-left">
            Discover top talent or find your next freelance job — fast, secure, and efficient.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mb-8">
            <input
              type="text"
              placeholder="Search for any service"
              className="w-full py-4 px-6 pr-14 rounded-full shadow-md bg-[#f8f8f8] text-black text-base outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center">
              <FaSearch className="text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white/20 text-white px-6 py-3 text-base rounded-full backdrop-blur-sm border border-white/30 font-medium">
              Find Freelancers
            </button>
            <button className="bg-white/10 text-white px-6 py-3 text-base rounded-full backdrop-blur-sm border border-white/30 font-medium">
              Browse Jobs
            </button>
            <button className="bg-white/10 text-white px-6 py-3 text-base rounded-full backdrop-blur-sm border border-white/30 font-medium">
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
