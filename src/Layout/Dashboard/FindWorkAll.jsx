import React, { useState } from "react";
import "./FindWorkAll.css";

// Dummy jobs data for demonstration (customize as needed)
const dummyJobs = [
  {
    id: 1,
    title: "Landing Page Design",
    status: "All",
    postedOn: "2025-06-10",
    budget: "$300",
    type: "Design",
    applicants: 8,
    description: "Design a responsive landing page for a SaaS product with Figma.",
  },
  {
    id: 2,
    title: "E-commerce Website",
    status: "Accepted",
    postedOn: "2025-05-15",
    budget: "$1200",
    type: "Development",
    applicants: 15,
    description: "Develop a full-featured e-commerce site using React and Node.js.",
  },
  {
    id: 3,
    title: "SEO Optimization",
    status: "Applied",
    postedOn: "2025-06-01",
    budget: "$450",
    type: "Marketing",
    applicants: 5,
    description: "Increase organic search ranking for a local business website.",
  },
  {
    id: 4,
    title: "Social Media Ads Campaign",
    status: "All",
    postedOn: "2025-03-20",
    budget: "$700",
    type: "Marketing",
    applicants: 4,
    description: "Run multi-channel ad campaigns for summer promotions.",
  },
  {
    id: 5,
    title: "Mobile App UI/UX",
    status: "Completed",
    postedOn: "2025-04-18",
    budget: "$900",
    type: "Design",
    applicants: 11,
    description: "Design intuitive UI/UX for a health-tracking mobile app.",
  },
];

const statusColors = {
  All: "#2563eb",
  Applied: "#f59e42",
  Accepted: "#059669",
  Completed: "#9333ea",
};

const statusIcons = {
  All: "work_outline",
  Applied: "hourglass_empty",
  Accepted: "check_circle",
  Completed: "emoji_events",
};

const iconBgColors = {
  All: "#fef3c7",
  Applied: "#fcd34d",
  Accepted: "#a7f3d0",
  Completed: "#f3e8ff",
};

const iconColors = {
  All: "#2563eb",
  Applied: "#f59e42",
  Accepted: "#059669",
  Completed: "#9333ea",
};

const infoChips = [
  {
    key: "postedOn",
    icon: "calendar_month",
    label: (job) => job.postedOn,
    bg: "#e0e7ef",
    color: "#475569",
  },
  {
    key: "budget",
    icon: "attach_money",
    label: (job) => job.budget,
    bg: "#fef9c3",
    color: "#eab308",
  },
  {
    key: "type",
    icon: "category",
    label: (job) => job.type,
    bg: "#e0f2fe",
    color: "#2563eb",
  },
  {
    key: "applicants",
    icon: "person",
    label: (job) => job.applicants,
    bg: "#f3e8ff",
    color: "#9333ea",
  },
];

const FindWorkAll = () => {
  const [jobs] = useState(dummyJobs);
  const [historyView, setHistoryView] = useState("card");
  const [filter, setFilter] = useState("All");
  // No search state, button instead

  // Tabs: All, Applied, Accepted, Completed
  const tabs = [
    { key: "All", label: "All" },
    { key: "Applied", label: "Applied" },
    { key: "Accepted", label: "Accepted" },
    { key: "Completed", label: "Completed" },
  ];

  // Tab counts
  const all = jobs.length;
  const applied = jobs.filter(j => j.status === "Applied").length;
  const accepted = jobs.filter(j => j.status === "Accepted").length;
  const completed = jobs.filter(j => j.status === "Completed").length;

  const overview = [
    {
      key: "All",
      icon: statusIcons.All,
      iconBg: iconBgColors.All,
      iconColor: iconColors.All,
      count: all,
      label: "All",
    },
    {
      key: "Applied",
      icon: statusIcons.Applied,
      iconBg: iconBgColors.Applied,
      iconColor: iconColors.Applied,
      count: applied,
      label: "Applied",
    },
    {
      key: "Accepted",
      icon: statusIcons.Accepted,
      iconBg: iconBgColors.Accepted,
      iconColor: iconColors.Accepted,
      count: accepted,
      label: "Accepted",
    },
    {
      key: "Completed",
      icon: statusIcons.Completed,
      iconBg: iconBgColors.Completed,
      iconColor: iconColors.Completed,
      count: completed,
      label: "Completed",
    },
  ];

  // Filtered jobs for current tab
  const filteredJobs = jobs.filter(job => {
    const matchTab = filter === "All" ? true : job.status === filter;
    return matchTab;
  });

  // Handlers
  const handleTab = (tab) => setFilter(tab);

  const handleView = (job) => {
    alert(`View job: ${job.title}`);
  };

  const handleSearchButton = () => {
    alert("Open job search modal or navigate to a search page!");
  };

  return (
    <div className="findworkall-container">
      <div className="findworkall-header">
        <h2>Find Work</h2>
        <button className="findworkall-search-btn" onClick={handleSearchButton}>
          <span className="material-icons">search</span>
          Search for a job
        </button>
      </div>

      {/* Overview cards as tabs */}
      <div className="findworkall-overview-cards">
        {overview.map((stat) => (
          <div
            key={stat.key}
            className={`findworkall-card${filter === stat.key ? " selected" : ""}`}
            style={{
              cursor: "pointer",
              border: filter === stat.key ? "2px solid #2563eb" : undefined,
              background: filter === stat.key ? "#e0e7ef" : undefined,
            }}
            onClick={() => handleTab(stat.key)}
          >
            <div
              className="findworkall-card-iconbox"
              style={{
                background: stat.iconBg,
              }}
            >
              <span
                className="material-icons findworkall-card-icon"
                style={{
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="findworkall-card-details">
              <div className="findworkall-card-count">{stat.count}</div>
              <div className="findworkall-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="findworkall-history-title">
        {filter} Jobs
        <div className="findworkall-history-viewbtns">
          <button
            className={`findworkall-history-viewbtn${historyView === "card" ? " active" : ""}`}
            onClick={() => setHistoryView("card")}
            title="Card View"
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`findworkall-history-viewbtn${historyView === "list" ? " active" : ""}`}
            onClick={() => setHistoryView("list")}
            title="List View"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {historyView === "list" ? (
        <div className="findworkall-table-wrapper">
          <table className="findworkall-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Posted On</th>
                <th>Budget</th>
                <th>Category</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="title">{job.title}</td>
                  <td>
                    <span
                      className="findworkall-status"
                      style={{
                        background: statusColors[job.status] || "#e5e7eb",
                        marginLeft: 0,
                      }}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>{job.postedOn}</td>
                  <td>{job.budget}</td>
                  <td>{job.type}</td>
                  <td>{job.applicants}</td>
                  <td>
                    <button className="findworkall-action-btn" onClick={() => handleView(job)}>
                      <span className="material-icons" style={{ color: "#2563eb" }}>visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="findworkall-cardhistory-grid">
          {filteredJobs.length === 0 && (
            <div className="findworkall-cardhistory-empty">No jobs found.</div>
          )}
          {filteredJobs.map((job) => (
            <div className="findworkall-history-card" key={job.id}>
              <div className="findworkall-history-card-header">
                <div className="findworkall-history-card-statusicon">
                  <span
                    className="material-icons"
                    style={{ color: iconColors[job.status] || "#999" }}
                  >
                    {statusIcons[job.status]}
                  </span>
                </div>
                <span
                  className="findworkall-status"
                  style={{
                    background: statusColors[job.status] || "#e5e7eb",
                    marginLeft: "0",
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="findworkall-history-card-title">{job.title}</div>
              <div className="findworkall-history-card-desc">{job.description}</div>
              <div className="findworkall-history-card-infochips">
                {infoChips.map(chip => (
                  <div
                    className="findworkall-history-chip"
                    key={chip.key}
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    <span className="material-icons">{chip.icon}</span>
                    <span>{chip.label(job)}</span>
                  </div>
                ))}
              </div>
              <div className="findworkall-history-card-actions">
                <button className="findworkall-history-card-action-btn view" onClick={() => handleView(job)}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindWorkAll;