import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';

const FindJobs = () => {
  const axiosPublic = UseAxiosPublic();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    title: '',
    keyword: '',
    salary: '',
    location: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosPublic.get('/jobs?status=accept');
        const extractedJobs = res.data.map(j => j.job || j);
        setJobs(extractedJobs);
        setFilteredJobs(extractedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [axiosPublic]);

  useEffect(() => {
    let result = jobs;
    if (filters.title) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    if (filters.keyword) {
      result = result.filter((job) =>
        job.description.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    if (filters.salary) {
      result = result.filter((job) => Number(job.salary) >= Number(filters.salary));
    }
    if (filters.location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    setFilteredJobs(result);
  }, [filters, jobs]);

  return (
    <div className="min-h-screen mx-auto mt-10 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Box - Sticky */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3 bg-gradient-to-br from-blue-100 via-white to-purple-100 border border-indigo-200 shadow-xl rounded-3xl p-6 backdrop-blur-sm sticky top-20 self-start overflow-y-auto max-h-[calc(100vh-5rem)]"
        >
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-6">🔍 Quick Search</h2>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border border-indigo-300 focus:ring-2 focus:ring-indigo-400 p-3 rounded-2xl text-gray-700 shadow-md"
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Keyword"
              className="w-full border border-indigo-300 focus:ring-2 focus:ring-indigo-400 p-3 rounded-2xl text-gray-700 shadow-md"
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            />
            <input
              type="number"
              placeholder="Minimum Salary"
              className="w-full border border-indigo-300 focus:ring-2 focus:ring-indigo-400 p-3 rounded-2xl text-gray-700 shadow-md"
              value={filters.salary}
              onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border border-indigo-300 focus:ring-2 focus:ring-indigo-400 p-3 rounded-2xl text-gray-700 shadow-md"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>
          <button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition">
            <FiSearch /> Search
          </button>
        </motion.div>

        {/* Job Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredJobs.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              🚫 No jobs found matching your criteria.
            </p>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/40 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between h-full"
              >
                <div className="space-y-4 mb-6 text-left">
                  {/* Title with left blue border */}
                  <h3 className="text-2xl font-semibold text-indigo-800 border-l-4 border-blue-500 pl-3">
                    {job.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base">{job.description.slice(0, 120)}...</p>

                  {/* Location and Salary with Icons */}
                  <div className="flex items-center gap-6 text-gray-600 text-base mt-2">
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-500" /> {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaDollarSign className="text-green-500" /> ${job.salary}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-4 mt-auto">
                  <button className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 rounded-full shadow-lg transition-all duration-300">
                    Apply Now
                  </button>
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="w-1/2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-full shadow-lg transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FindJobs;
