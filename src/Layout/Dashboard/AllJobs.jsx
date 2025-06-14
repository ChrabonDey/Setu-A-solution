import React, { useState } from "react";
import "./AllJobs.css";

// Update statuses: 'Live' (post is open, no one hired), 'Working' (freelancer hired), 'Finished', 'Cancelled'
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
  Live: "#f59e42",
  Working: "#2563eb",
  Finished: "#059669",
  Cancelled: "#ef4444",
};

const statusIcons = {
  Live: "hourglass_empty",
  Working: "autorenew",
  Finished: "check_circle",
  Cancelled: "highlight_off",
  All: "work_outline",
};

const iconBgColors = {
  All: "#fcd34d",
  Live: "#fef3c7",
  Working: "#a7f3d0",
  Finished: "#93c5fd",
  Cancelled: "#fecaca",
};

const iconColors = {
  All: "#f59e42",
  Live: "#f59e42",
  Working: "#2563eb",
  Finished: "#059669",
  Cancelled: "#ef4444",
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

const AllJobs = () => {
  const [jobs] = useState(dummyJobs);
  const [historyView, setHistoryView] = useState("card");

  // Job counts by status
  const total = jobs.length;
  const live = jobs.filter(j => j.status === "Live").length;
  const working = jobs.filter(j => j.status === "Working").length;
  const finished = jobs.filter(j => j.status === "Finished").length;
  const cancelled = jobs.filter(j => j.status === "Cancelled").length;

  const overview = [
    {
      key: "All",
      icon: statusIcons.All,
      iconBg: iconBgColors.All,
      iconColor: iconColors.All,
      count: total,
      label: "Total Jobs",
    },
    {
      key: "Live",
      icon: statusIcons.Live,
      iconBg: iconBgColors.Live,
      iconColor: iconColors.Live,
      count: live,
      label: "Live",
    },
    {
      key: "Working",
      icon: statusIcons.Working,
      iconBg: iconBgColors.Working,
      iconColor: iconColors.Working,
      count: working,
      label: "Working",
    },
    {
      key: "Finished",
      icon: statusIcons.Finished,
      iconBg: iconBgColors.Finished,
      iconColor: iconColors.Finished,
      count: finished,
      label: "Finished",
    },
    {
      key: "Cancelled",
      icon: statusIcons.Cancelled,
      iconBg: iconBgColors.Cancelled,
      iconColor: iconColors.Cancelled,
      count: cancelled,
      label: "Cancelled",
    },
  ];

  const handlePostNewJob = () => {
    alert("Redirect to Job Post Page (implement navigation here)");
  };

  return (
    <div className="alljobs-container">
      <div className="alljobs-header">
        <h2>All Posted Jobs</h2>
        <button className="alljobs-post-btn" onClick={handlePostNewJob}>
          <span className="material-icons">add_circle</span>
          Post New Job
        </button>
      </div>
      {/* Overview cards */}
      <div className="alljobs-overview-cards">
        {overview.map((stat) => (
          <div className="alljobs-card" key={stat.key}>
            <div
              className="alljobs-card-iconbox"
              style={{
                background: stat.iconBg,
              }}
            >
              <span
                className="material-icons alljobs-card-icon"
                style={{
                  color: stat.iconColor,
                }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="alljobs-card-details">
              <div className="alljobs-card-count">{stat.count}</div>
              <div className="alljobs-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="alljobs-history-title">
        Job History
        <div className="alljobs-history-viewbtns">
          <button
            className={`alljobs-history-viewbtn${historyView === "card" ? " active" : ""}`}
            onClick={() => setHistoryView("card")}
            title="Card View"
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`alljobs-history-viewbtn${historyView === "list" ? " active" : ""}`}
            onClick={() => setHistoryView("list")}
            title="List View"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {historyView === "list" ? (
        <div className="alljobs-table-wrapper">
          <table className="alljobs-table">
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
                      className="alljobs-status"
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
                    <button className="alljobs-action-btn">
                      <span className="material-icons" style={{ color: "#b6bad3" }}>visibility</span>
                    </button>
                    {(job.hired === 0) && (
                      <>
                        <button className="alljobs-action-btn">
                          <span className="material-icons" style={{ color: "#b6bad3" }}>edit</span>
                        </button>
                        <button className="alljobs-action-btn">
                          <span className="material-icons" style={{ color: "#b6bad3" }}>delete</span>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
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
        <div className="alljobs-cardhistory-grid">
          {jobs.length === 0 && (
            <div className="alljobs-cardhistory-empty">No jobs found.</div>
          )}
          {jobs.map((job) => (
            <div className="alljobs-history-card" key={job.id}>
              <div className="alljobs-history-card-header">
                <div className="alljobs-history-card-statusicon">
                  <span
                    className="material-icons"
                    style={{ color: iconColors[job.status] || "#999" }}
                  >
                    {statusIcons[job.status]}
                  </span>
                </div>
                <span
                  className="alljobs-status"
                  style={{
                    background: statusColors[job.status] || "#e5e7eb",
                    marginLeft: "0",
                  }}
                >
                  {job.status}
                </span>
              </div>
              <div className="alljobs-history-card-title">{job.title}</div>
              <div className="alljobs-history-card-desc">{job.description}</div>
              <div className="alljobs-history-card-infochips">
                {infoChips.map(chip => (
                  <div
                    className="alljobs-history-chip"
                    key={chip.key}
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    <span className="material-icons">{chip.icon}</span>
                    <span>{chip.label(job)}</span>
                  </div>
                ))}
              </div>
              <div className="alljobs-history-card-actions">
                <button className="alljobs-history-card-action-btn view">
                  View
                </button>
                {(job.hired === 0) && (
                  <>
                    <button className="alljobs-history-card-action-btn edit">
                      Edit
                    </button>
                    <button className="alljobs-history-card-action-btn delete">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;