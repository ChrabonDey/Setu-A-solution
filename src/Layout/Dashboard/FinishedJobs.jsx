import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FinishedJobs.css";

// Dummy "finished" jobs data
const finishedJobs = [
  {
    id: 2,
    title: "E-commerce Website",
    status: "Finished",
    postedOn: "2025-05-15",
    budget: "$1200",
    type: "Development",
    applicants: 15,
    description: "Develop a full-featured e-commerce site using React and Node.js.",
    hired: 2,
  },
  {
    id: 5,
    title: "Mobile App UI/UX",
    status: "Finished",
    postedOn: "2025-04-18",
    budget: "$900",
    type: "Design",
    applicants: 11,
    description: "Design intuitive UI/UX for a health-tracking mobile app.",
    hired: 1,
  },
];

const statusColors = {
  Finished: "#059669",
};
const statusIcons = {
  Finished: "check_circle",
};
const iconBgColors = {
  Finished: "#93c5fd",
};
const iconColors = {
  Finished: "#059669",
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

const FinishedJobs = () => {
  const [historyView, setHistoryView] = useState("card");
  const jobs = finishedJobs;
  const navigate = useNavigate();

  // Overview card for finished jobs
  const finishedCount = jobs.length;
  const overview = [
    {
      key: "Finished",
      icon: statusIcons.Finished,
      iconBg: iconBgColors.Finished,
      iconColor: iconColors.Finished,
      count: finishedCount,
      label: "Finished Jobs",
    },
  ];

  const handleView = (job) => {
    alert(`View job: ${job.title}`);
  };

  return (
    <div className="finishedjobs-container">
      <div className="finishedjobs-header">
        <h2>Finished Jobs</h2>
        <button
          className="finishedjobs-post-btn"
          onClick={() => navigate("/dashboard-nex/post-job/finished/post-new-job")}
        >
          <span className="material-icons">add_circle</span>
          Post New Job
        </button>
      </div>
      {/* Overview cards */}
      <div className="finishedjobs-overview-cards">
        {overview.map((stat) => (
          <div className="finishedjobs-card" key={stat.key}>
            <div
              className="finishedjobs-card-iconbox"
              style={{
                background: stat.iconBg,
              }}
            >
              <span
                className="material-icons finishedjobs-card-icon"
                style={{
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="finishedjobs-card-details">
              <div className="finishedjobs-card-count">{stat.count}</div>
              <div className="finishedjobs-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="finishedjobs-history-title">
        Finished Job Posts
        <div className="finishedjobs-history-viewbtns">
          <button
            className={`finishedjobs-history-viewbtn${historyView === "card" ? " active" : ""}`}
            onClick={() => setHistoryView("card")}
            title="Card View"
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`finishedjobs-history-viewbtn${historyView === "list" ? " active" : ""}`}
            onClick={() => setHistoryView("list")}
            title="List View"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {historyView === "list" ? (
        <div className="finishedjobs-table-wrapper">
          <table className="finishedjobs-table">
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
                      className="finishedjobs-status"
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
                    <button className="finishedjobs-action-btn" onClick={() => handleView(job)}>
                      <span className="material-icons" style={{ color: "#059669" }}>visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                    No finished jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="finishedjobs-cardhistory-grid">
          {jobs.length === 0 && (
            <div className="finishedjobs-cardhistory-empty">No finished jobs found.</div>
          )}
          {jobs.map((job) => (
            <div className="finishedjobs-history-card" key={job.id}>
              <div className="finishedjobs-history-card-header">
                <div className="finishedjobs-history-card-statusicon">
                  <span
                    className="material-icons"
                    style={{ color: iconColors[job.status] || "#999" }}
                  >
                    {statusIcons[job.status]}
                  </span>
                </div>
                <span
                  className="finishedjobs-status"
                  style={{
                    background: statusColors[job.status] || "#e5e7eb",
                    marginLeft: "0",
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="finishedjobs-history-card-title">{job.title}</div>
              <div className="finishedjobs-history-card-desc">{job.description}</div>
              <div className="finishedjobs-history-card-infochips">
                {infoChips.map(chip => (
                  <div
                    className="finishedjobs-history-chip"
                    key={chip.key}
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    <span className="material-icons">{chip.icon}</span>
                    <span>{chip.label(job)}</span>
                  </div>
                ))}
              </div>
              <div className="finishedjobs-history-card-actions">
                <button className="finishedjobs-history-card-action-btn view" onClick={() => handleView(job)}>
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

export default FinishedJobs;