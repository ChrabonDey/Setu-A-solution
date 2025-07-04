import React, { useState, useRef, useEffect } from "react";
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

// Popup component for card actions
function CardActionPopup({ onClose, onView, onEdit, onDelete, showEditDelete = true, anchorRef }) {
  // Close popup if clicked outside
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        (!anchorRef || !anchorRef.current || !anchorRef.current.contains(e.target))
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose, anchorRef]);

  return (
    <div className="card-action-popup" ref={popupRef}>
      <div className="card-action-popup-item" onClick={onView}>
        <span className="material-icons">visibility</span> View
      </div>
      {showEditDelete && (
        <>
          <div className="card-action-popup-item" onClick={onEdit}>
            <span className="material-icons" style={{ color: "#f59e42" }}>edit</span> Edit
          </div>
          <div className="card-action-popup-item" onClick={onDelete}>
            <span className="material-icons" style={{ color: "#ef4444" }}>delete</span> Delete
          </div>
        </>
      )}
    </div>
  );
}

const LiveJobs = () => {
  const [historyView, setHistoryView] = useState("card");
  const [popupJobId, setPopupJobId] = useState(null);
  const anchorRefs = useRef({});
  const jobs = dummyJobs;

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

  const handlePostNewJob = () => {
    alert("Redirect to Job Post Page (implement navigation here)");
  };

  // Popup action handlers
  const handleView = (job) => {
    alert(`View job: ${job.title}`);
    setPopupJobId(null);
  };
  const handleEdit = (job) => {
    alert(`Edit job: ${job.title}`);
    setPopupJobId(null);
  };
  const handleDelete = (job) => {
    alert(`Delete job: ${job.title}`);
    setPopupJobId(null);
  };

  // Ensure anchorRefs for all jobs
  jobs.forEach(job => {
    if (!anchorRefs.current[job.id]) anchorRefs.current[job.id] = React.createRef();
  });

  return (
    <div className="livejobs-container">
      <div className="livejobs-header">
        <h2>Live Jobs</h2>
        <button className="livejobs-post-btn" onClick={handlePostNewJob}>
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
                  <td style={{ position: "relative" }}>
                    <span
                      className="livejobs-action-btn"
                      ref={anchorRefs.current[job.id]}
                      onClick={e => {
                        e.stopPropagation();
                        setPopupJobId(popupJobId === job.id ? null : job.id);
                      }}
                    >
                      <img
                        src="https://i.postimg.cc/xTC3MKF8/edit-3-svgrepo-com.png"
                        alt="Actions"
                        style={{ width: 28, height: 28 }}
                      />
                    </span>
                    {popupJobId === job.id && (
                      <CardActionPopup
                        onClose={() => setPopupJobId(null)}
                        onView={() => handleView(job)}
                        onEdit={() => handleEdit(job)}
                        onDelete={() => handleDelete(job)}
                        showEditDelete={job.hired === 0}
                        anchorRef={anchorRefs.current[job.id]}
                      />
                    )}
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
              <div className="livejobs-history-card-actions" style={{ justifyContent: "flex-end" }}>
                <span
                  className="livejobs-action-btn"
                  ref={anchorRefs.current[job.id]}
                  onClick={e => {
                    e.stopPropagation();
                    setPopupJobId(popupJobId === job.id ? null : job.id);
                  }}
                >
                  <img
                    src="https://i.postimg.cc/xTC3MKF8/edit-3-svgrepo-com.png"
                    alt="Actions"
                    style={{ width: 28, height: 28 }}
                  />
                </span>
                {popupJobId === job.id && (
                  <CardActionPopup
                    onClose={() => setPopupJobId(null)}
                    onView={() => handleView(job)}
                    onEdit={() => handleEdit(job)}
                    onDelete={() => handleDelete(job)}
                    showEditDelete={job.hired === 0}
                    anchorRef={anchorRefs.current[job.id]}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveJobs;