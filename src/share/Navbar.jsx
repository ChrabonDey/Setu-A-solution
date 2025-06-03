import React, { useContext, useState, useEffect, useRef } from "react";
import img1 from "../assets/7fdb87b0-b823-427e-9078-b45260defc74.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../provider/Authprovider";
import { FaCoins } from "react-icons/fa";
import UseAxiosPublic from "../hooks/UseAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useContext(authContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef();
  const [credit, setCredit] = useState(0);
  const axiosPublic=UseAxiosPublic()

useEffect(() => {
  if (user?.email) {
    axiosPublic.get(`/user/${user.email}`)
      .then(res => {
        console.log("User credits:", res.data.credits);
        setCredit(res.data.credits);
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          console.warn("User not found, setting credits to 0");
          setCredit(0); // fallback if user not found
        } else {
          console.error("Error fetching credit:", err);
        }
      });
  }
}, [user]);





  // Fetch notifications for logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`/notifications/${user.email}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error("Failed to fetch notifications:", err));
    } else {
      setNotifications([]);
    }
  }, [user]);

  // Close notification dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark notification as read on click
  const handleNotificationClick = async (notif) => {
    setShowNotifDropdown(false);
    navigate(`/job/${notif.jobId}#comments`);

    if (notif.read) return;

    // Mark as read on backend
    try {
      await fetch(`/notifications/${notif._id}`, {
        method: "PATCH",
      });
      // Update state locally to mark as read
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notif._id ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(()=>{
  //   axiosPublic.get('/user')
  // })
  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full bg-white sticky top-0 z-50">
      <div className="navbar px-4 md:px-8 py-3 text-black font-semibold justify-between">
        {/* Navbar Start */}
        <div className="flex items-center gap-3">
          <img
            src={img1}
            alt="Logo"
            className="w-10 h-10 p-1 border rounded-full shadow-sm"
          />
          <span className="text-[#006dc7] text-2xl lg:text-3xl font-bold hidden md:block">
            SETU
          </span>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex gap-6 items-center">
          <NavLink className="hover:text-[#4978ff]" to="/">
            Home
          </NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/about">
            Find Jobs
          </NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/why">
            Why Setu
          </NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/find-jobs">
            Find Jobs
          </NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/contact">
            Contact
          </NavLink>
           
          {user && (
            <NavLink to="/dashboard">
              <button className="btn border-[#006dc7] text-black px-6 rounded-2xl font-semibold hover:bg-[#4343e5] hover:text-white transition-transform hover:scale-105">
                Dashboard
              </button>
            </NavLink>
          

           
          )}
           {
            user && (
                 <button className="btn border-[#006dc7] text-black px-6 rounded-2xl font-semibold hover:bg-[#4343e5] hover:text-white transition-transform hover:scale-105">
                {credit} <FaCoins></FaCoins>
                {console.log(credit)}
              </button>
            )
          } 
        </div>

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul className="menu dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52 space-y-2">
            <NavLink to="/" className="hover:text-[#4978ff]">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-[#4978ff]">
              Find Jobs
            </NavLink>
            <NavLink to="/why" className="hover:text-[#4978ff]">
              Why Setu
            </NavLink>
            <NavLink to="/find-jobs" className="hover:text-[#4978ff]">
              Find jobs
            </NavLink>
            <NavLink to="/contact" className="hover:text-[#4978ff]">
              Contact
            </NavLink>
            {user && (
              <NavLink to="/dashboard" className="hover:text-[#4978ff]">
                Dashboard
              </NavLink>
            )}
          </ul>
        </div>

        {/* Navbar End (Auth Buttons / Profile / Notifications) */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          {user && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative focus:outline-none"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 hover:text-[#006dc7]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5.106"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 21h-2a2 2 0 002-2v0a2 2 0 002 2z"
                  />
                </svg>
                {/* Red dot for unread */}
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded shadow-lg z-50">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif._id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`cursor-pointer p-3 border-b last:border-none hover:bg-gray-100 ${
                          notif.read ? "bg-white" : "bg-blue-50 font-semibold"
                        }`}
                      >
                        <p>
                          <span className="font-semibold text-[#006dc7]">
                            {notif.commentBy}
                          </span>{" "}
                          mentioned you in a comment.
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(notif.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <>
              <NavLink to="/login">
                <button className="text-black hover:text-[#4978ff] transition-transform hover:scale-105">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="btn bg-[#006dc7] text-white px-6 rounded-2xl font-semibold hover:bg-[#4343e5] hover:scale-105 transition">
                  Sign Up
                </button>
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 h-10 rounded-full ring ring-[#006dc7] ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>
              <ul className="dropdown-content menu p-3 shadow bg-white rounded-box w-56 space-y-2">
                <li className="font-medium text-sm text-gray-600">
                  {user.displayName || user.email}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn w-full bg-[#006dc7] text-white font-semibold hover:bg-[#4343e5] transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
