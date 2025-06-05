import React, { useContext, useState, useEffect, useRef } from "react";
import img1 from "../assets/7fdb87b0-b823-427e-9078-b45260defc74.jpeg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../provider/Authprovider";

const NOTIF_ICON = "https://i.postimg.cc/rwqvKnyJ/notification-bing-svgrepo-com.png";

const Navbar = () => {
  const { user, logOut } = useContext(authContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef();

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif) => {
    setShowNotifDropdown(false);
    navigate(`/job/${notif.jobId}#comments`);
    if (notif.read) return;
    try {
      await fetch(`/notifications/${notif._id}`, {
        method: "PATCH",
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Utility: Get initial from name or email
  const getInitial = () => {
    if (user?.displayName && user.displayName.length > 0) {
      return user.displayName[0].toUpperCase();
    }
    if (user?.email && user.email.length > 0) {
      return user.email[0].toUpperCase();
    }
    return "?";
  };

  // Scroll to bottom handler for Contact
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      navigate("/#contact");
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 200); // Wait for navigation
    }
  };

  return (
    <div
      className="w-full sticky top-0 z-50 shadow-xl" // Added shadow-xl class here
      style={{
        background: "#f9fafb",
        borderRadius: "10px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12), 0 4px 24px 0 rgba(80,80,120,0.08)" // Enhanced drop shadow
      }}
    >
      <div
        className="navbar px-4 md:px-8 py-3 font-semibold justify-between"
        style={{ color: "#181f3a" }}
      >
        {/* Navbar Start */}
        <div className="flex items-center gap-3">
          <img
            src={img1}
            alt="Logo"
            className="w-10 h-10 p-1 border rounded-full shadow-md" // shadow-md for logo
            style={{ borderColor: "#f5b942" }}
          />
          <span
            className="text-[#181f3a] text-2xl lg:text-3xl font-bold hidden md:block tracking-wide"
            style={{ color: "#181f3a" }}
          >
            SETU
          </span>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex gap-3 items-center">
          <NavLink
            className={({ isActive }) =>
              "hover:text-[#3b82f6]" +
              (isActive ? " text-[#3b82f6]" : " text-[#181f3a]")
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "hover:text-[#f5b942]" +
              (isActive ? " text-[#f5b942]" : " text-[#181f3a]")
            }
            to="/about"
          >
            Hire
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "hover:text-[#3b82f6]" +
              (isActive ? " text-[#3b82f6]" : " text-[#181f3a]")
            }
            to="/find-jobs"
          >
            Find Jobs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "hover:text-[#3b82f6]" +
              (isActive ? " text-[#3b82f6]" : " text-[#181f3a]")
            }
            to="/why"
          >
            Why SETU
          </NavLink>
          {/* Contact link scrolls to bottom */}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="hover:text-[#f5b942] text-[#181f3a] cursor-pointer"
            style={{ fontWeight: 600 }}
          >
            Contact
          </a>
          <NavLink to="/freelancer">
            <button
              className="btn border-0 px-4 rounded-2xl font-semibold transition-transform hover:scale-105 flex items-center shadow" // shadow for freelancer button
              style={{
                background: "#f5b942",
                color: "#181f3a",
                border: "1px solid #f5b942",
                marginRight: "0.4rem",
                fontWeight: 600
              }}
            >
              Freelancer?
            </button>
          </NavLink>
          {user && (
            <NavLink to="/dashboard">
              <button
                className="btn border-0 px-6 rounded-2xl font-semibold transition-transform hover:scale-105 shadow" // shadow for dashboard button
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "1px solid #3b82f6",
                  marginLeft: 0,
                }}
              >
                Dashboard
              </button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost dropdown-toggle"
            style={{ color: "#3b82f6", background: "transparent" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ display: "block" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            className="menu dropdown-content mt-3 z-[1] p-3 shadow-lg rounded-box w-52 space-y-2" // shadow-lg for mobile
            style={{ background: "#f9fafb", color: "#181f3a", borderRadius: "0 0 16px 16px" }}
          >
            <NavLink to="/" className="hover:text-[#3b82f6]">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-[#f5b942]">
              Hire
            </NavLink>
            <NavLink to="/find-jobs" className="hover:text-[#3b82f6]">
              Find jobs
            </NavLink>
            <NavLink to="/why" className="hover:text-[#3b82f6]">
              Why Setu
            </NavLink>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="hover:text-[#f5b942] text-[#181f3a] cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              Contact
            </a>
            <NavLink to="/freelancer" className="hover:text-[#f5b942] flex items-center">
              Freelancer?
            </NavLink>
            {user && (
              <NavLink to="/dashboard" className="hover:text-[#3b82f6]">
                Dashboard
              </NavLink>
            )}
          </ul>
        </div>

        {/* Navbar End (Auth Buttons / Profile / Notifications) */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          {user && (
            <div
              className="relative flex items-center"
              ref={notifRef}
              style={{ height: "40px" }}
            >
              <button
                onClick={() => {
                  if (notifications.length > 0) setShowNotifDropdown(!showNotifDropdown);
                }}
                className="relative focus:outline-none flex items-center justify-center shadow" // shadow for bell
                aria-label="Notifications"
                style={{
                  height: "38px",
                  width: "38px",
                  borderRadius: "50%",
                  background: "#f0f4fa",
                  border: "none",
                  marginRight: "2px",
                  padding: 0,
                  display: "flex",
                }}
              >
                <img
                  src={NOTIF_ICON}
                  alt="Notifications"
                  style={{
                    width: 23,
                    height: 23,
                    display: "block",
                    objectFit: "contain",
                  }}
                />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-[#3b82f6]"></span>
                )}
              </button>

              {/* Notification Dropdown - only show if there are notifications */}
              {showNotifDropdown && notifications.length > 0 && (
                <div
                  className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded shadow-lg z-50"
                  style={{
                    background: "#ffffff",
                    color: "#181f3a",
                    borderRadius: "0 0 16px 16px",
                  }}
                >
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`cursor-pointer p-3 border-b last:border-none hover:bg-[#f3f4f6] ${
                        notif.read
                          ? "bg-[#ffffff]"
                          : "bg-[#f0f8ff] font-semibold"
                      }`}
                      style={{ borderColor: "#e5e7eb", borderRadius: "8px" }}
                    >
                      <p>
                        <span className="font-semibold text-[#3b82f6]">
                          {notif.commentBy}
                        </span>{" "}
                        mentioned you in a comment.
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(notif.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <>
<NavLink to="/login">
  <button
    className="transition-transform hover:scale-105"
    style={{
      color: "#3b82f6",
      background: "none",
    }}
  >
    Login
  </button>
</NavLink>
              <NavLink to="/signup">
                <button
                  className="btn px-6 rounded-2xl font-semibold hover:scale-105 transition shadow" // shadow for signup
                  style={{
                    background: "#3b82f6",
                    color: "#fff",
                    border: "1px solid #3b82f6",
                  }}
                >
                  Sign Up
                </button>
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="avatar cursor-pointer dropdown-toggle shadow" // shadow for avatar
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {user.photoURL ? (
                  <div
                    className="w-10 h-10 rounded-full ring shadow"
                    style={{
                      ringColor: "#3b82f6",
                      borderColor: "#3b82f6",
                      overflow: "hidden",
                      background: "#f0f4fa",
                    }}
                  >
                    <img src={user.photoURL} alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full ring flex items-center justify-center text-lg font-bold shadow"
                    style={{
                      ringColor: "#3b82f6",
                      borderColor: "#3b82f6",
                      background: "#e8eaf6",
                      color: "#3b82f6",
                      userSelect: "none",
                    }}
                  >
                    {getInitial()}
                  </div>
                )}
              </div>
              <ul
                className="dropdown-content menu p-3 shadow-lg rounded-box w-56 space-y-2" // shadow-lg for dropdown menu
                style={{
                  background: "#f9fafb",
                  color: "#181f3a",
                  borderRadius: "0 0 14px 14px",
                }}
              >
                <li className="font-medium text-sm text-gray-600">
                  {user.displayName || user.email}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn w-full font-semibold hover:bg-[#3b82f6] hover:text-white transition shadow"
                    style={{
                      background: "#f5b942",
                      color: "#181f3a",
                      border: "1px solid #f5b942",
                      borderRadius: "8px",
                    }}
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