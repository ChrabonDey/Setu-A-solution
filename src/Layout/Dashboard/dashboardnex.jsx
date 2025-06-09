import React, { useState } from "react";
import "./dashboardnex.css";

const menuData = [
  {
    label: "Dashboard",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9h-14v-9h-3z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9h-14v-9h-3z"/></svg>
      ),
    },
  },
  {
    label: "Find Work",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" fill="black" width="18" height="18" viewBox="0 0 24 24"><path d="M10 2a8 8 0 105.293 14.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 1010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" fill="white" width="18" height="18" viewBox="0 0 24 24"><path d="M10 2a8 8 0 105.293 14.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 1010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/></svg>
      ),
    },
    dropdown: true,
    submenu: ["All", "Applied", "Accepted", "Completed"],
  },
  {
    label: "Post a Job",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
      ),
    },
    dropdown: true,
    submenu: ["All", "Active", "Finished"],
  },
  {
    label: "Freelancers",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" fill="black" width="18" height="18" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C17 14.17 12.33 13 10 13zm8 0c-.29 0-.62.02-.97.05C18.02 14.21 20 15.25 20 16.5V19h4v-2.5C24 14.17 20.33 13 18 13z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" fill="white" width="18" height="18" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C17 14.17 12.33 13 10 13zm8 0c-.29 0-.62.02-.97.05C18.02 14.21 20 15.25 20 16.5V19h4v-2.5C24 14.17 20.33 13 18 13z"/></svg>
      ),
    },
  },
  {
    label: "My Profile",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M12 14c-4 0-6.5 2-6.5 2v2h13v-2s-2.5-2-6.5-2z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M12 14c-4 0-6.5 2-6.5 2v2h13v-2s-2.5-2-6.5-2z"/></svg>
      ),
    },
    dropdown: true,
    submenu: ["Profile", "Reviews", "Settings"],
  },
  {
    label: "Messages",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
      ),
    },
  },
  {
    label: "Projects",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><path d="M10 4H2v16h20V6H12l-2-2z"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M10 4H2v16h20V6H12l-2-2z"/></svg>
      ),
    },
    dropdown: true,
    submenu: ["Active", "Completed", "Pending"],
  },
  {
    label: "Payments",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>
      ),
    },
    dropdown: true,
    submenu: ["Transactions", "Withdrawals", "Billing"],
  },
  {
    label: "Support",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M2 12h4m12 0h4M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49l2.83 2.83M19.07 4.93l-2.83 2.83M6.34 17.66l-2.83 2.83"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M2 12h4m12 0h4M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49l2.83 2.83M19.07 4.93l-2.83 2.83M6.34 17.66l-2.83 2.83"/></svg>
      ),
    },
  },
  {
    label: "About",
    icon: {
      black: (
        <svg className="icon-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><rect x="11" y="11" width="2" height="6"/><rect x="11" y="7" width="2" height="2"/></svg>
      ),
      white: (
        <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><rect x="11" y="11" width="2" height="6"/><rect x="11" y="7" width="2" height="2"/></svg>
      ),
    },
  },
];

const DashboardNex = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");

  const handleNavClick = (item) => {
    setSelected(item.label);
    setOpenDropdown("");
  };

  const handleDropdownClick = (item) => {
    setOpenDropdown(openDropdown === item.label ? "" : item.label);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="https://i.postimg.cc/L6B4CHbf/setu-log-and-name.png" alt="SETU Logo" />
        </div>
        <div className="separator"></div>
        <nav className="nav">
          {menuData.map((item) => (
            <React.Fragment key={item.label}>
              <div
                className={`nav-item${selected === item.label ? " selected" : ""}${item.dropdown ? " dropdown" : ""}${openDropdown === item.label ? " open" : ""}`}
                onClick={() => {
                  if (item.dropdown) {
                    handleDropdownClick(item);
                  } else {
                    handleNavClick(item);
                  }
                }}
                tabIndex={0}
                style={{ userSelect: "none" }}
              >
                <span className="menu-icon">
                  {selected === item.label ? item.icon.white : item.icon.black}
                </span>
                {item.label}
                {item.dropdown && (
                  <img
                    className="dropdown-icon"
                    src="https://i.postimg.cc/0201gnBh/dropdown-arrow-svgrepo-com.png"
                    alt="dropdown arrow"
                  />
                )}
              </div>
              {item.dropdown && (
                <div
                  className="submenu"
                  style={{ display: openDropdown === item.label ? "flex" : "none" }}
                >
                  {item.submenu.map((sub) => (
                    <div
                      className={`nav-item${selected === sub + "_" + item.label ? " selected" : ""}`}
                      key={sub}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(sub + "_" + item.label);
                        setOpenDropdown(item.label);
                      }}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="main">
        <header className="header">
          <div className="breadcrumbs">
            <span>
              /{" "}
              {typeof selected === "string" && selected.includes("_")
                ? selected.split("_")[1]
                : selected}
            </span>
            <h1>
              {typeof selected === "string" && selected.includes("_")
                ? selected.split("_")[0]
                : selected}
            </h1>
          </div>
          <input type="text" className="search-bar" placeholder="Search here" />
          <div className="header-user">
            <div className="header-notification">
              {/* Google Material Notification Icon (Light Blue) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 22c1.1 0 1.99-.9 1.99-2h-3.98A2 2 0 0 0 12 22zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2.5a1.5 1.5 0 0 0-3 0v.18C7.64 3.36 6 5.92 6 9v7l-1.99 2c-.01.01-.01.03-.01.04A1 1 0 0 0 5 21h14a1 1 0 0 0 .99-1.09c0-.01 0-.03-.01-.04L18 16z"
                  fill="#00a4d6"
                />
              </svg>
            </div>
            <div className="header-profile">
              <img
                className="profile-img"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
              />
              <span className="profile-name">Shamim Kabir</span>
            </div>
          </div>
        </header>
        <div className="content-area">{/* Content goes here */}</div>
      </main>
    </div>
  );
};

export default DashboardNex;