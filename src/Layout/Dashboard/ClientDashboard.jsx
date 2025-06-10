import React from "react";
import "./FreelancerDashboard.css"; // Reuse styles for consistency

const ClientDashboard = () => {
  // Simulate state for onboarding progress (could use useState for real app)
  const [profileProgress, setProfileProgress] = React.useState(60);
  const [onboarding, setOnboarding] = React.useState([
    { title: "Add Company Logo", desc: "Help freelancers recognize your brand", completed: true },
    { title: "Verify Company Email", desc: "Build trust with freelancers", completed: false, btn: "Verify" },
    { title: "Post Your First Job", desc: "Start receiving proposals", completed: false, btn: "Post" },
    { title: "Set Payment Method", desc: "Pay freelancers securely", completed: false, btn: "Set Up" },
  ]);

  // Handle onboarding click
  const handleOnboardingClick = (idx) => {
    if (!onboarding[idx].completed) {
      const newOnboarding = onboarding.map((item, i) =>
        i === idx ? { ...item, completed: true, btn: "Completed" } : item
      );
      setOnboarding(newOnboarding);
      setProfileProgress((prev) =>
        prev < 100 ? prev + 15 : 100
      );
    }
  };

  // Posted Jobs data
  const jobs = [
    {
      title: "Landing Page Design Needed",
      badge: "New",
      meta: [
        { icon: "fa-clock", text: "1 hour ago" },
        { icon: "fa-map-marker-alt", text: "Remote" },
        { icon: "fa-briefcase", text: "Web Design" },
      ],
      proposals: 8,
      desc: "Looking for a creative designer to create a modern landing page for our startup.",
      budget: "$300 - $500",
      status: "Open",
    },
    {
      title: "Mobile App Development",
      badge: null,
      meta: [
        { icon: "fa-clock", text: "2 days ago" },
        { icon: "fa-map-marker-alt", text: "Remote" },
        { icon: "fa-briefcase", text: "App Development" },
      ],
      proposals: 15,
      desc: "Need a skilled mobile developer for our social networking app MVP.",
      budget: "$2,000+",
      status: "In Review",
    },
  ];

  // Hired Freelancers (placeholder)
  const freelancers = [
    {
      name: "Jane Doe",
      role: "Web Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "Working",
    },
    {
      name: "Samuel Lee",
      role: "Mobile Developer",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      status: "Completed",
    },
  ];

  // Testimonials/tips
  const tips = [
    {
      tip: "Post clear, detailed job descriptions to attract the best freelancers.",
      author: "Lisa Carter",
      role: "Hiring Expert",
    },
    {
      tip: "Respond quickly to proposals to keep freelancers engaged.",
      author: "David Kim",
      role: "Project Manager",
    },
    {
      tip: "Set up milestones and provide regular feedback for successful projects.",
      author: "Emily Brown",
      role: "Client Success Lead",
    },
  ];

  // Stat cards data
  const statCards = [
    {
      icon: "fa-briefcase",
      className: "free-icon-blue",
      value: jobs.length.toString(),
      label: "Jobs Posted",
    },
    {
      icon: "fa-users",
      className: "free-icon-green",
      value: freelancers.length.toString(),
      label: "Freelancers Hired",
    },
    {
      icon: "fa-dollar-sign",
      className: "free-icon-purple",
      value: "$0",
      label: "Spent this month",
    },
  ];

  return (
    <main className="free-main-content">
      <section className="free-welcome-section">
        <h1>Welcome Back, Client! <span role="img" aria-label="handshake">🤝</span></h1>
        <p>
          Ready to find top talent for your next project? Complete your profile to attract high-quality freelancers.
        </p>
      </section>

      {/* Stats Cards */}
      <div className="free-stats-container">
        {statCards.map(({ icon, className, value, label }, idx) => (
          <div className="free-stat-card" key={idx}>
            <div className={`free-stat-icon ${className}`}>
              <i className={`fas ${icon}`}></i>
            </div>
            <div className="free-stat-info">
              <h3>{value}</h3>
              <p>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="free-dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Onboarding Card */}
          <div className="free-card free-onboarding-card">
            <h3>
              <i className="fas fa-tasks"></i> Complete Your Profile
            </h3>
            <div className="free-progress-container">
              <div className="free-progress-header">
                <span>Profile Strength</span>
                <span>{profileProgress}%</span>
              </div>
              <div className="free-progress-bar">
                <div
                  className="free-progress-fill"
                  style={{ width: profileProgress + "%" }}
                ></div>
              </div>
            </div>
            {onboarding.map((item, idx) => (
              <div
                className={`free-onboarding-item${item.completed ? " free-completed" : ""}`}
                key={idx}
                onClick={() => handleOnboardingClick(idx)}
                style={{ cursor: item.completed ? "default" : "pointer" }}
              >
                <div className="free-check-circle">
                  <i className={`fas ${item.completed ? "fa-check" : "fa-plus"}`}></i>
                </div>
                <div className="free-onboarding-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                {!item.completed && (
                  <button className="free-btn free-btn-primary">{item.btn}</button>
                )}
                {item.completed && item.btn && (
                  <button className="free-btn free-btn-outline" disabled>
                    {item.btn}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Posted Jobs */}
          <div className="free-section-title">
            <h2>
              <i className="fas fa-clipboard-list"></i> Your Posted Jobs
            </h2>
            <a href="#">
              Post a Job <i className="fas fa-plus"></i>
            </a>
          </div>
          <div className="free-card">
            {jobs.length === 0 ? (
              <div style={{ color: "#94a3b8" }}>You haven't posted any jobs yet.</div>
            ) : (
              jobs.map((job, idx) => (
                <div className="free-job-card" key={idx}>
                  <h4>
                    {job.title}
                    {job.badge && <span className="free-job-badge">{job.badge}</span>}
                  </h4>
                  <div className="free-job-meta">
                    {job.meta.map((m, i) => (
                      <span key={i}>
                        <i className={`fas ${m.icon}`}></i> {m.text}
                      </span>
                    ))}
                  </div>
                  <p>{job.desc}</p>
                  <div className="free-job-footer">
                    <div className="free-job-price">{job.budget}</div>
                    <div style={{ fontSize: "0.95rem", color: "#4361ee" }}>
                      {job.proposals} Proposals
                    </div>
                    <button className="free-btn free-btn-outline">
                      {job.status === "Open" ? "View Proposals" : "Reviewing"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Right Column */}
        <div className="right-column">
          {/* Hired Freelancers */}
          <div className="free-card">
            <div className="free-section-title">
              <h2>
                <i className="fas fa-users"></i> Freelancers Hired
              </h2>
            </div>
            {freelancers.length === 0 ? (
              <div style={{ color: "#94a3b8" }}>You haven't hired any freelancers yet.</div>
            ) : (
              freelancers.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={f.avatar}
                    alt={f.name}
                    style={{ width: 48, height: 48, borderRadius: "50%" }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: "0.93rem", color: "#94a3b8" }}>{f.role}</div>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      color: f.status === "Working" ? "#06d6a0" : "#8b5cf6",
                      fontWeight: 500,
                    }}
                  >
                    {f.status}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Tips for Clients */}
          <div className="free-card">
            <div className="free-section-title">
              <h2>
                <i className="fas fa-lightbulb"></i> Tips for Clients
              </h2>
            </div>
            {tips.map((t, idx) => (
              <div className="free-testimonial-card" key={idx}>
                <div className="free-testimonial-content">
                  <p>{t.tip}</p>
                  <div className="free-testimonial-author">{t.author}</div>
                  <div className="free-testimonial-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientDashboard;