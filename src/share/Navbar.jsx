import React, { useContext, useState, useEffect, useRef } from "react";
import img1 from "../assets/7fdb87b0-b823-427e-9078-b45260defc74.jpeg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../provider/Authprovider";

const NOTIF_ICON = "https://i.postimg.cc/rwqvKnyJ/notification-bing-svgrepo-com.png";
import { FaCoins } from "react-icons/fa";
import UseAxiosPublic from "../hooks/UseAxiosPublic";

const NAV_LINK_INACTIVE = "#7a7a8c"; // grayish
const NAV_LINK_ACTIVE = "#3b82f6";
const NAV_LINK_SIZE = "15px";

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
      await fetch(`/notifications/${notif._id}`, { method: "PATCH" });
      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleLogout = () => {
    logOut().catch((error) => { console.log(error); });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getInitial = () => {
    if (user?.displayName && user.displayName.length > 0) {
      return user.displayName[0].toUpperCase();
    }
    if (user?.email && user.email.length > 0) {
      return user.email[0].toUpperCase();
    }
    return "?";
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      navigate("/#contact");
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <div
      className="w-full sticky top-0 z-50 shadow-xl"
      style={{
        background: "#f9fafb",
        borderRadius: "10px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12), 0 4px 24px 0 rgba(80,80,120,0.08)",
        // removed overflow: hidden to allow dropdowns to show
      }}
    >
      <div
        className="navbar px-4 md:px-8 font-semibold justify-between"
        style={{
          color: "#181f3a",
          borderRadius: "10px",
          background: "white",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {/* Navbar Start */}
        <div className="flex items-center gap-3">
          <img
            src={img1}
            alt="Logo"
            className="w-10 h-10 p-1 border rounded-full shadow-md"
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
        <div className="hidden lg:flex gap-2 items-center">
          {[
            { to: "/", label: "HOME" },
            { to: "/about", label: "HIRE FREELANCER" },
            { to: "/find-jobs", label: "FIND JOBS" },
            { to: "/why", label: "WHY SETU" }
          ].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                "nav-link-custom" + (isActive ? " nav-link-active" : "")
              }
              style={{
                fontSize: NAV_LINK_SIZE,
                fontWeight: 500,
                margin: 0,
                padding: "0 5px",
                background: "none",
                borderRadius: 0,
                transition: "color 0.12s",
              }}
            >
              {link.label}
            </NavLink>
          ))}
          {/* Contact link scrolls to bottom */}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="nav-link-custom"
            style={{
              fontWeight: 500,
              fontSize: NAV_LINK_SIZE,
              margin: 0,
              padding: "0 5px",
              background: "none",
              borderRadius: 0,
              color: NAV_LINK_INACTIVE,
            }}
          >
            CONTACT
          </a>
          {user && (
            <NavLink to="/dashboard">
              <button
                className="btn border-0 px-6 rounded-2xl font-semibold transition-transform hover:scale-105 shadow"
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "1px solid #3b82f6",
                  marginLeft: 0,
                  fontSize: NAV_LINK_SIZE,
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
            className="menu dropdown-content mt-3 z-[1] p-3 shadow-lg rounded-box w-52 space-y-2"
            style={{
              background: "#f9fafb",
              color: NAV_LINK_INACTIVE,
              borderRadius: "0 0 16px 16px"
            }}
          >
            <NavLink to="/" className="nav-link-custom">
              HOME
            </NavLink>
            <NavLink to="/about" className="nav-link-custom">
              HIRE FREELANCER
            </NavLink>
            <NavLink to="/find-jobs" className="nav-link-custom">
              FIND JOBS
            </NavLink>
            <NavLink to="/why" className="nav-link-custom">
              WHY SETU
            </NavLink>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="nav-link-custom cursor-pointer"
            >
              CONTACT
            </a>
            {user && (
              <NavLink to="/dashboard" className="nav-link-custom">
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
                className="relative focus:outline-none flex items-center justify-center "
                aria-label="Notifications"
                style={{
                  height: "38px",
                  width: "38px",
                  borderRadius: "50%",
                  
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
                    borderRadius: "0 0 16px 16px"
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
                  className="btn px-6 rounded-2xl font-semibold hover:scale-105 transition shadow"
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
                className="avatar cursor-pointer dropdown-toggle "
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent"
                }}
              >
                {user.photoURL ? (
                  <div
                    className="w-10 h-10 rounded-full ring "
                    style={{
                      ringColor: "#3b82f6",
                      borderColor: "#3b82f6",
                      overflow: "hidden",
                      background: "transparent",
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
                      background: "transparent",
                      color: "#3b82f6",
                      userSelect: "none",
                    }}
                  >
                    {getInitial()}
                  </div>
                )}
              </div>
              <ul
                className="dropdown-content menu p-3 shadow-lg rounded-box w-56 space-y-2"
                style={{
                  background: "#f9fafb",
                  color: "#181f3a",
                  borderRadius: "0 0 14px 14px"
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
      {/* NAV LINK CUSTOM STYLE */}
      <style>{`
        .nav-link-custom {
          color: ${NAV_LINK_INACTIVE};
          background: none !important;
          border-radius: 0 !important;
          padding: 0 5px;
          text-decoration: none;
        }
        .nav-link-custom:hover {
          color: ${NAV_LINK_ACTIVE};
          background: none !important;
        }
        .nav-link-active {
          color: ${NAV_LINK_ACTIVE} !important;
          font-weight: 600;
          background: none !important;
        }
      `}</style>
    </div>
  );
};

export default Navbar;