import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LiveJobs.css";

// Dummy live jobs data
const dummyJobs = [
  {
    id: 1,
    title: "Landing Page Design",
    status: "Live",
    postedOn: "2025-06-10",
    budget: "$300",
    type: "Design",
    applicants: 8,
    description: "Design a responsive landing page for a SaaS product with Figma.",
    hired: 0,
  },
  {
    id: 4,
    title: "Social Media Ads Campaign",
    status: "Live",
    postedOn: "2025-03-20",
    budget: "$700",
    type: "Marketing",
    applicants: 4,
    description: "Run multi-channel ad campaigns for summer promotions.",
    hired: 0,
  },
];

const statusColors = {
  Live: "#f59e42",
};
const statusIcons = {
  Live: "hourglass_empty",
};
const iconBgColors = {
  Live: "#fef3c7",
};
const iconColors = {
  Live: "#f59e42",
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

const LiveJobs = () => {
  const [historyView, setHistoryView] = useState("card");
  const jobs = dummyJobs;
  const [/*showJobForm*/, /*setShowJobForm*/] = useState(false); // No longer used
  const navigate = useNavigate();

  const live = jobs.length;

  const overview = [
    {
      key: "Live",
      icon: statusIcons.Live,
      iconBg: iconBgColors.Live,
      iconColor: iconColors.Live,
      count: live,
      label: "Live Jobs",
    },
  ];

  const handleView = (job) => {
    alert(`View job: ${job.title}`);
  };
  const handleEdit = (job) => {
    alert(`Edit job: ${job.title}`);
  };
  const handleDelete = (job) => {
    alert(`Delete job: ${job.title}`);
  };

  return (
    <div className="livejobs-container">
      <div className="livejobs-header">
        <h2>Live Jobs</h2>
        <button
          className="livejobs-post-btn"
          onClick={() => navigate("/dashboard-nex/post-job/live/post-new-job")}
        >
          <span className="material-icons">add_circle</span>
          Post New Job
        </button>
      </div>
      {/* Overview cards */}
      <div className="livejobs-overview-cards">
        {overview.map((stat) => (
          <div className="livejobs-card" key={stat.key}>
            <div
              className="livejobs-card-iconbox"
              style={{
                background: stat.iconBg,
              }}
            >
              <span
                className="material-icons livejobs-card-icon"
                style={{
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="livejobs-card-details">
              <div className="livejobs-card-count">{stat.count}</div>
              <div className="livejobs-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="livejobs-history-title">
        Live Job Posts
        <div className="livejobs-history-viewbtns">
          <button
            className={`livejobs-history-viewbtn${historyView === "card" ? " active" : ""}`}
            onClick={() => setHistoryView("card")}
            title="Card View"
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`livejobs-history-viewbtn${historyView === "list" ? " active" : ""}`}
            onClick={() => setHistoryView("list")}
            title="List View"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {historyView === "list" ? (
        <div className="livejobs-table-wrapper">
          <table className="livejobs-table">
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
                      className="livejobs-status"
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
                    <button className="livejobs-action-btn" onClick={() => handleView(job)}>
                      <span className="material-icons" style={{ color: "#b6bad3" }}>visibility</span>
                    </button>
                    <button className="livejobs-action-btn" onClick={() => handleEdit(job)}>
                      <span className="material-icons" style={{ color: "#b6bad3" }}>edit</span>
                    </button>
                    <button className="livejobs-action-btn" onClick={() => handleDelete(job)}>
                      <span className="material-icons" style={{ color: "#b6bad3" }}>delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                    No live jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="livejobs-cardhistory-grid">
          {jobs.length === 0 && (
            <div className="livejobs-cardhistory-empty">No live jobs found.</div>
          )}
          {jobs.map((job) => (
            <div className="livejobs-history-card" key={job.id}>
              <div className="livejobs-history-card-header">
                <div className="livejobs-history-card-statusicon">
                  <span
                    className="material-icons"
                    style={{ color: iconColors[job.status] || "#999" }}
                  >
                    {statusIcons[job.status]}
                  </span>
                </div>
                <span
                  className="livejobs-status"
                  style={{
                    background: statusColors[job.status] || "#e5e7eb",
                    marginLeft: "0",
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="livejobs-history-card-title">{job.title}</div>
              <div className="livejobs-history-card-desc">{job.description}</div>
              <div className="livejobs-history-card-infochips">
                {infoChips.map(chip => (
                  <div
                    className="livejobs-history-chip"
                    key={chip.key}
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    <span className="material-icons">{chip.icon}</span>
                    <span>{chip.label(job)}</span>
                  </div>
                ))}
              </div>
              <div className="livejobs-history-card-actions">
                <button className="livejobs-history-card-action-btn view" onClick={() => handleView(job)}>
                  View
                </button>
                <button className="livejobs-history-card-action-btn edit" onClick={() => handleEdit(job)}>
                  Edit
                </button>
                <button className="livejobs-history-card-action-btn delete" onClick={() => handleDelete(job)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveJobs;