import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { authContext } from '../../provider/Authprovider';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import  "./Dashboard.css";

// ICONS
import { MdSpaceDashboard, MdPostAdd, MdBarChart, MdWorkOutline, MdAssignmentTurnedIn } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHome } from 'react-icons/ai';
import { BsClipboardCheck, BsBoxArrowInUpRight, BsListTask } from 'react-icons/bs';

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

  const handleToggle = () => setToggle(!toggle);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen overflow-hidden">
        <p className="text-lg text-gray-600">Loading user information...</p>
      </div>
    );
  }

  const navItems = [
    { to: '/dashboard', icon: <MdSpaceDashboard />, text: 'Dashboard' },
    { to: '/dashboard/profile', icon: <CgProfile />, text: 'My Profile' },
    { to: '/dashboard/post', icon: <MdPostAdd />, text: 'Post a Job' },
    { to: '/dashboard/request', icon: <BsClipboardCheck />, text: 'Requested Jobs' },
    { to: '/dashboard/reviewQueue', icon: <BsBoxArrowInUpRight />, text: 'Job Bids' },
    { to: '/dashboard/statistics', icon: <MdBarChart />, text: 'Statistics Page' },
    { to: '/dashboard/accept', icon: <MdWorkOutline />, text: 'Job Posts' },
    { to: '/dashboard/task', icon: <BsListTask />, text: 'My Task' },
    { to: '/dashboard/my-work', icon: <MdAssignmentTurnedIn />, text: 'My Work' },
    { to: '/', icon: <AiOutlineHome />, text: 'Home', extra: true }
  ];

  return (
    <div clasname="dashu">
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${toggle ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-header">
          <h1 className={`sidebar-title ${toggle ? 'collapsed' : 'expanded'}`}>
            SETU
          </h1>
        </div>
        <ul className="sidebar-list">
          {navItems.map(({ to, icon, text, extra }) => (
            <li key={to} className="sidebar-item">
              {extra && <hr className="my-4 border-blue-400" />}
              <NavLink
                to={to}
                end={to === '/dashboard'}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-icon">{icon}</span>
                {!toggle && <span className="sidebar-text">{text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <button
            onClick={handleToggle}
            className="btn btn-sm toggle-button"
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
            <div className="avatar-container">
              <button className="btn btn-ghost btn-circle">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="cart-badge">8</span>
              </button>
            </div>
            {/* Avatar */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="avatar-image avatar-ring">
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
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
