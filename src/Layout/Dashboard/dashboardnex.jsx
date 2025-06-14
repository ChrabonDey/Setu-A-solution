import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
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
  MdHome,
  MdNotificationsNone,
  MdSearch,
} from "react-icons/md";
import BothDashboard from "./BothDashboard";
import ChatX from "./ChatX"; // <-- Import ChatX

const menuData = [
  {
    label: "Dashboard",
    icon: <MdDashboard size={18} />,
    path: "", // index route for dashboard
  },
  {
    label: "Find Work",
    icon: <MdWorkOutline size={18} />,
    dropdown: true,
    submenu: [
      { label: "All", path: "find-work/all" },
      { label: "Applied", path: "find-work/applied" },
      { label: "Accepted", path: "find-work/accepted" },
      { label: "Completed", path: "find-work/completed" },
    ],
    path: "find-work",
  },
  {
    label: "Post a Job",
    icon: <MdOutlineLibraryAdd size={18} />,
    dropdown: true,
    submenu: [
      { label: "All", path: "post-job/all" },
      { label: "Active", path: "post-job/active" },
      { label: "Finished", path: "post-job/finished" },
    ],
    path: "post-job",
  },
  {
    label: "Freelancers",
    icon: <MdGroup size={18} />,
    path: "freelancers",
  },
  {
    label: "My Profile",
    icon: <MdPerson size={18} />,
    dropdown: true,
    submenu: [
      { label: "Profile", path: "my-profile/profile" },
      { label: "Reviews", path: "my-profile/reviews" },
      { label: "Settings", path: "my-profile/settings" },
      // Don't add edit-profile here!
    ],
    path: "my-profile",
  },
  {
    label: "Messages",
    icon: <MdMessage size={18} />,
    path: "messages", // This path will now render ChatX
  },
  {
    label: "Projects",
    icon: <MdAssignment size={18} />,
    dropdown: true,
    submenu: [
      { label: "Active", path: "projects/active" },
      { label: "Completed", path: "projects/completed" },
      { label: "Pending", path: "projects/pending" },
    ],
    path: "projects",
  },
  {
    label: "Payments",
    icon: <MdPayment size={18} />,
    dropdown: true,
    submenu: [
      { label: "Transactions", path: "payments/transactions" },
      { label: "Withdrawals", path: "payments/withdrawals" },
      { label: "Billing", path: "payments/billing" },
    ],
    path: "payments",
  },
  {
    label: "Support",
    icon: <MdHelpOutline size={18} />,
    path: "support",
  },
];

const homeMenuItem = {
  label: "Home",
  icon: <MdHome size={18} />,
  path: "/",
};

const DashboardNex = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");

  // Flatten menuData for lookup
  const allSubmenus = menuData.flatMap((item) =>
    item.dropdown
      ? item.submenu.map((sub) => ({
          ...sub,
          parent: item.label,
          parentPath: item.path,
        }))
      : []
  );

  // Improved: Select the matching sidebar/submenu for deep routes
  useEffect(() => {
    let currentPath = location.pathname.replace(/^\/dashboard-nex\/?/, "");

    // Direct dashboard
    if (!currentPath || currentPath === "") {
      setSelected(""); // dashboard root
      setOpenDropdown("");
      return;
    }

    // Find an exact submenu match
    let submenu = allSubmenus.find((sub) => currentPath === sub.path);

    // If not, try to find the submenu whose path is a prefix of currentPath (for deep routes)
    if (!submenu) {
      submenu = allSubmenus.find((sub) =>
        currentPath.startsWith(sub.path)
      );
    }

    if (submenu) {
      setSelected(submenu.path);
      setOpenDropdown(submenu.parent);
      return;
    }

    // Try matching a main menu item (like "messages" or "support")
    const menu = menuData.find((item) => currentPath === item.path);

    if (menu) {
      setSelected(menu.path);
      setOpenDropdown("");
      return;
    }

    // Otherwise, deselect all
    setSelected("");
    setOpenDropdown("");
  }, [location.pathname]);

  const sidebarMenu = [...menuData, { separator: true }, homeMenuItem];

  const handleNavClick = (item) => {
    setSelected(item.path);
    setOpenDropdown("");
    if (item.path.startsWith("/")) {
      navigate(item.path);
    } else if (!item.path) {
      navigate("/dashboard-nex");
    } else {
      navigate(`/dashboard-nex/${item.path}`);
    }
  };

  const handleDropdownClick = (item) => {
    setOpenDropdown(openDropdown === item.label ? "" : item.label);
  };

  const handleSubmenuClick = (sub, parent) => {
    setSelected(sub.path);
    setOpenDropdown(parent.label);
    navigate(`/dashboard-nex/${sub.path}`);
  };

  const breadcrumbs = () => {
    if (selected === "") {
      return (
        <>
          <span>/ Dashboard</span>
          <h1>Dashboard</h1>
        </>
      );
    }
    const submenu = allSubmenus.find((sub) => sub.path === selected);
    if (submenu) {
      return (
        <>
          <span>/ {submenu.parent}</span>
          <h1>{submenu.label}</h1>
        </>
      );
    }
    const menu = menuData.find((item) => item.path === selected);
    if (menu) {
      return (
        <>
          <span>/ {menu.label}</span>
          <h1>{menu.label}</h1>
        </>
      );
    }
    return null;
  };

  const isDashboardRoot =
    location.pathname === "/dashboard-nex" ||
    location.pathname === "/dashboard-nex/";

  return (
    <div className="nex-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="https://i.postimg.cc/L6B4CHbf/setu-log-and-name.png" alt="SETU Logo" />
        </div>
        {/* Always visible top separator */}
        <div className="separator"></div>
        <nav className="nav">
          {menuData.map((item) => (
            <React.Fragment key={item.label}>
              <div
                className={`nav-item${selected === item.path ? " selected" : ""}${item.dropdown ? " dropdown" : ""}${openDropdown === item.label ? " open" : ""}`}
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
                <span className="menu-icon">{item.icon}</span>
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
                      className={`nav-item${selected === sub.path ? " selected" : ""}`}
                      key={sub.path}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubmenuClick(sub, item);
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="separator"></div>

          {/* Home always at the bottom */}
          <div
            className={`nav-item${selected === homeMenuItem.path ? " selected" : ""}`}
            onClick={() => handleNavClick(homeMenuItem)}
            tabIndex={0}
            style={{ userSelect: "none" }}
          >
            <span className="menu-icon">{homeMenuItem.icon}</span>
            {homeMenuItem.label}
          </div>
        </nav>
        {/* Always visible bottom separator */}
      </aside>
      <main className="main">
        <header className="header">
          <div className="breadcrumbs">{breadcrumbs()}</div>
          <div className="search-bar-wrapper">
            <MdSearch size={20} className="search-icon" />
            <input type="text" className="search-bar" placeholder="Search dashboard..." />
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
          {/* Route renders ChatX if path is /dashboard-nex/messages */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardNex;