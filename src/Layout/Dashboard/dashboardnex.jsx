import React, { useState } from "react";
import "./dashboardnex.css";
import {
  MdDashboard,
  MdWorkOutline,
  MdOutlineLibraryAdd,
  MdGroup,
  MdPerson,
  MdMessage,
  MdAssignment,
  MdPayment,
  MdHelpOutline,
  MdInfoOutline,
  MdNotificationsNone,
  MdSearch
} from "react-icons/md";
import FreelancerDashboard from "./FreelancerDashboard";
import ClientDashboard from "./ClientDashboard";


const menuData = [
  {
    label: "Dashboard",
    icon: <MdDashboard size={18} />,
  },
  {
    label: "Find Work",
    icon: <MdWorkOutline size={18} />,
    dropdown: true,
    submenu: ["All", "Applied", "Accepted", "Completed"],
  },
  {
    label: "Post a Job",
    icon: <MdOutlineLibraryAdd size={18} />,
    dropdown: true,
    submenu: ["All", "Active", "Finished"],
  },
  {
    label: "Freelancers",
    icon: <MdGroup size={18} />,
  },
  {
    label: "My Profile",
    icon: <MdPerson size={18} />,
    dropdown: true,
    submenu: ["Profile", "Reviews", "Settings"],
  },
  {
    label: "Messages",
    icon: <MdMessage size={18} />,
  },
  {
    label: "Projects",
    icon: <MdAssignment size={18} />,
    dropdown: true,
    submenu: ["Active", "Completed", "Pending"],
  },
  {
    label: "Payments",
    icon: <MdPayment size={18} />,
    dropdown: true,
    submenu: ["Transactions", "Withdrawals", "Billing"],
  },
  {
    label: "Support",
    icon: <MdHelpOutline size={18} />,
  },
  {
    label: "About",
    icon: <MdInfoOutline size={18} />,
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

  // Render content based on selected menu
  const renderContent = () => {
    if (selected === "Dashboard") {
      return <ClientDashboard />;
    }
    // Add additional content renders for other menu items if needed
    return null;
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
                  {item.icon}
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
          <div className="search-bar-wrapper">
            <MdSearch size={20} className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search dashboard..."
            />
          </div>
          <div className="header-user">
            <div className="header-notification">
              <MdNotificationsNone size={26} color="#00a4d6" />
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
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardNex;