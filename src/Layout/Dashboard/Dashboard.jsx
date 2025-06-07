import React, { useContext, useEffect, useState } from 'react';
import {
  FcBinoculars,
  FcBullish,
  FcBusinessman,
  FcConferenceCall,
  FcTodoList,
  FcSurvey
} from 'react-icons/fc'; 

import { NavLink, Outlet } from 'react-router-dom';
import { authContext } from '../../provider/Authprovider';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { FaHome, FaList, FaProductHunt } from 'react-icons/fa';

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(authContext);
  const axiosPublic = UseAxiosPublic();
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    axiosPublic.get(`/apply-jobs?posterEmail=${user.email}`)
      .then(res => {
        const applications = res.data;
        if (applications.length > 0) {
          setJobId(applications[0].jobId);
        }
      })
      .catch(err => {
        console.error('Error fetching applied jobs:', err);
      });
  }, [user?.email]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans transition-all duration-300">
      {/* Sidebar */}
      <div className={`${
        toggle ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-blue-100 to-blue-200 shadow-lg text-gray-800 transition-all duration-300`}>
        <div className="text-center py-6 border-b border-blue-300">
          <h1 className={`text-2xl font-extrabold tracking-wide text-blue-700 uppercase transition-all duration-300 ${toggle ? 'text-sm' : 'text-3xl'}`}>
            SETU
          </h1>
        </div>
        <ul className="px-4 py-6 space-y-2">
          {[
            { to: '/dashboard', icon: <FaHome />, text: 'Dashboard' }, // New: Dashboard menu item
            { to: '/dashboard/profile', icon: <FcBusinessman />, text: 'My Profile' },
            { to: '/dashboard/post', icon: <FaProductHunt />, text: 'Post a Job' },
            { to: '/dashboard/request', icon: <FaList/>, text: 'Requested Jobs' },
            { to: '/dashboard/reviewQueue', icon: <FcBinoculars />, text: 'Job Bids' },
            { to: '/dashboard/statistics', icon: <FcBullish />, text: 'Statistics Page' },
            { to: '/dashboard/accept', icon: <FcConferenceCall />, text: 'Job Posts' },
            { to: '/dashboard/task', icon: <FcTodoList />, text: 'My Task' },
            { to: '/dashboard/my-work', icon: <FcSurvey />, text: 'My Work' },
            { to: '/', icon: <FaHome />, text: 'Home', extra: true }
          ].map(({ to, icon, text, extra }) => (
            <li key={to}>
              {extra && <hr className="my-4 border-blue-400" />}
              <NavLink
                to={to}
                end={to === '/dashboard'} // ensures exact match for dashboard root
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow'
                      : 'hover:bg-blue-100 hover:text-blue-700'
                  }`
                }
              >
                <span className="text-xl">{icon}</span>
                {!toggle && <span className="text-sm font-medium">{text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <button
            onClick={handleToggle}
            className="btn btn-sm bg-blue-100 hover:bg-blue-200 text-blue-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            {/* Cart */}
            <div className="relative">
              <button className="btn btn-ghost btn-circle">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5">8</span>
              </button>
            </div>

            {/* Avatar */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full ring ring-[#006dc7] ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
              >
                <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
                <li><NavLink to='/dashboard/edit'>Edit Profile</NavLink></li>
                <li><NavLink to=''>Logout</NavLink></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-6 py-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;