import React, { useState } from "react";
import "./WorkingJobs.css";

// Dummy "working" jobs data
const workingJobs = [
  {
    id: 3,
    title: "SEO Optimization",
    status: "Working",
    postedOn: "2025-06-01",
    budget: "$450",
    type: "Marketing",
    applicants: 5,
    description: "Increase organic search ranking for a local business website.",
    hired: 1,
  },
];

const statusColors = {
  Working: "#2563eb",
};
const statusIcons = {
  Working: "autorenew",
};
const iconBgColors = {
  Working: "#a7f3d0",
};
const iconColors = {
  Working: "#2563eb",
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

const WorkingJobs = () => {
  const [historyView, setHistoryView] = useState("card");
  const jobs = workingJobs;

  // Overview card for working jobs
  const workingCount = jobs.length;
  const overview = [
    {
      key: "Working",
      icon: statusIcons.Working,
      iconBg: iconBgColors.Working,
      iconColor: iconColors.Working,
      count: workingCount,
      label: "Working Jobs",
    },
  ];

  const handlePostNewJob = () => {
    alert("Redirect to Job Post Page (implement navigation here)");
  };

  const handleView = (job) => {
    alert(`View job: ${job.title}`);
  };

  return (
    <div className="workingjobs-container">
      <div className="workingjobs-header">
        <h2>Working Jobs</h2>
        <button className="livejobs-post-btn" onClick={handlePostNewJob}>
          <span className="material-icons">add_circle</span>
          Post New Job
        </button>
      </div>
      {/* Overview cards */}
      <div className="workingjobs-overview-cards">
        {overview.map((stat) => (
          <div className="workingjobs-card" key={stat.key}>
            <div
              className="workingjobs-card-iconbox"
              style={{
                background: stat.iconBg,
              }}
            >
              <span
                className="material-icons workingjobs-card-icon"
                style={{
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="workingjobs-card-details">
              <div className="workingjobs-card-count">{stat.count}</div>
              <div className="workingjobs-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="workingjobs-history-title">
        Working Job Posts
        <div className="workingjobs-history-viewbtns">
          <button
            className={`workingjobs-history-viewbtn${historyView === "card" ? " active" : ""}`}
            onClick={() => setHistoryView("card")}
            title="Card View"
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`workingjobs-history-viewbtn${historyView === "list" ? " active" : ""}`}
            onClick={() => setHistoryView("list")}
            title="List View"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {historyView === "list" ? (
        <div className="workingjobs-table-wrapper">
          <table className="workingjobs-table">
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
                      className="workingjobs-status"
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
                    <button className="workingjobs-action-btn" onClick={() => handleView(job)}>
                      <span className="material-icons" style={{ color: "#2563eb" }}>visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                    No working jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="workingjobs-cardhistory-grid">
          {jobs.length === 0 && (
            <div className="workingjobs-cardhistory-empty">No working jobs found.</div>
          )}
          {jobs.map((job) => (
            <div className="workingjobs-history-card" key={job.id}>
              <div className="workingjobs-history-card-header">
                <div className="workingjobs-history-card-statusicon">
                  <span
                    className="material-icons"
                    style={{ color: iconColors[job.status] || "#999" }}
                  >
                    {statusIcons[job.status]}
                  </span>
                </div>
                <span
                  className="workingjobs-status"
                  style={{
                    background: statusColors[job.status] || "#e5e7eb",
                    marginLeft: "0",
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="workingjobs-history-card-title">{job.title}</div>
              <div className="workingjobs-history-card-desc">{job.description}</div>
              <div className="workingjobs-history-card-infochips">
                {infoChips.map(chip => (
                  <div
                    className="workingjobs-history-chip"
                    key={chip.key}
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    <span className="material-icons">{chip.icon}</span>
                    <span>{chip.label(job)}</span>
                  </div>
                ))}
              </div>
              <div className="workingjobs-history-card-actions">
                <button className="workingjobs-history-card-action-btn view" onClick={() => handleView(job)}>
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

export default WorkingJobs;