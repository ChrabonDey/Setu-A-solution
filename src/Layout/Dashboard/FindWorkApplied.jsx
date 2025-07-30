import React, { useState } from "react";
import "./FindWorkApplied.css";

// Dummy applied jobs data for demonstration
const dummyJobs = [
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
    id: 6,
    title: "Logo Redesign",
    status: "Applied",
    postedOn: "2025-06-25",
    budget: "$200",
    type: "Design",
    applicants: 3,
    description: "Redesign the logo for a local coffee shop.",
  },
];

const statusColors = {
  Applied: "#f59e42",
};

const statusIcons = {
  Applied: "hourglass_empty",
};

const iconBgColors = {
  Applied: "#fcd34d",
};

const iconColors = {
  Applied: "#f59e42",
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

const FindWorkApplied = () => {
  const [jobs] = useState(dummyJobs);
  const [historyView, setHistoryView] = useState("card");

  // Only applied jobs for this page
  const appliedCount = jobs.length;

  const overview = [
    {
      key: "Applied",
      icon: statusIcons.Applied,
      iconBg: iconBgColors.Applied,
      iconColor: iconColors.Applied,
      count: appliedCount,
      label: "Applied",
    },
  ];

  const handleView = (job) => {
    alert(`View job: ${job.title}`);
  };

  const handleSearchButton = () => {
    alert("Open job search modal or navigate to a search page!");
  };

  return (
    <div className="findworkapplied-container">
      <div className="findworkapplied-header">
        <h2>Applied Jobs</h2>
        <button className="findworkapplied-search-btn" onClick={handleSearchButton}>
          <span className="material-icons">search</span>
          Search for a job
        </button>
      </div>

      {/* Overview card */}
      <div className="findworkapplied-overview-cards">
        {overview.map((stat) => (
          <div
            key={stat.key}
            className="findworkapplied-card selected"
            style={{
              border: "2px solid #f59e42",
              background: "#fff7ed",
              cursor: "default",
            }}
          >
            <div
              className="findworkapplied-card-iconbox"
              style={{
                background: stat.iconBg,
              }}
            >
              <span
                className="material-icons findworkapplied-card-icon"
                style={{
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="findworkapplied-card-details">
              <div className="findworkapplied-card-count">{stat.count}</div>
              <div className="findworkapplied-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="findworkapplied-history-title">
        Applied Jobs
        <div className="findworkapplied-history-viewbtns">
          <button
            className={`findworkapplied-history-viewbtn${historyView === "card" ? " active" : ""}`}
            onClick={() => setHistoryView("card")}
            title="Card View"
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`findworkapplied-history-viewbtn${historyView === "list" ? " active" : ""}`}
            onClick={() => setHistoryView("list")}
            title="List View"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {historyView === "list" ? (
        <div className="findworkapplied-table-wrapper">
          <table className="findworkapplied-table">
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
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="title">{job.title}</td>
                  <td>
                    <span
                      className="findworkapplied-status"
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
                    <button className="findworkapplied-action-btn" onClick={() => handleView(job)}>
                      <span className="material-icons" style={{ color: "#f59e42" }}>visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                    No applied jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="findworkapplied-cardhistory-grid">
          {jobs.length === 0 && (
            <div className="findworkapplied-cardhistory-empty">No applied jobs found.</div>
          )}
          {jobs.map((job) => (
            <div className="findworkapplied-history-card" key={job.id}>
              <div className="findworkapplied-history-card-header">
                <div className="findworkapplied-history-card-statusicon">
                  <span
                    className="material-icons"
                    style={{ color: iconColors[job.status] || "#999" }}
                  >
                    {statusIcons[job.status]}
                  </span>
                </div>
                <span
                  className="findworkapplied-status"
                  style={{
                    background: statusColors[job.status] || "#e5e7eb",
                    marginLeft: "0",
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="findworkapplied-history-card-title">{job.title}</div>
              <div className="findworkapplied-history-card-desc">{job.description}</div>
              <div className="findworkapplied-history-card-infochips">
                {infoChips.map(chip => (
                  <div
                    className="findworkapplied-history-chip"
                    key={chip.key}
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    <span className="material-icons">{chip.icon}</span>
                    <span>{chip.label(job)}</span>
                  </div>
                ))}
              </div>
              <div className="findworkapplied-history-card-actions">
                <button className="findworkapplied-history-card-action-btn view" onClick={() => handleView(job)}>
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

export default FindWorkApplied;