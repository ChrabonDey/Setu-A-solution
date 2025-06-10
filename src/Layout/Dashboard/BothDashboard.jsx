import React from "react";
import "./FreelancerDashboard.css"; // Reuse the same CSS

const BothDashboard = () => {
  // Example combined stats (replace/mock with your real data)
  const combinedStats = [
    {
      icon: "fa-briefcase",
      className: "free-icon-blue",
      value: "2",
      label: "Jobs Posted",
    },
    {
      icon: "fa-paper-plane",
      className: "free-icon-green",
      value: "3",
      label: "Proposals Sent",
    },
    {
      icon: "fa-users",
      className: "free-icon-purple",
      value: "1",
      label: "Freelancers Hired",
    },
    {
      icon: "fa-dollar-sign",
      className: "free-icon-green",
      value: "$400",
      label: "Earned",
    },
    {
      icon: "fa-credit-card",
      className: "free-icon-blue",
      value: "$250",
      label: "Spent",
    },
  ];

  // Minimal job/proposal/freelancer data (mock)
  const postedJobs = [
    {
      title: "Landing Page Design",
      status: "Open",
      proposals: 5,
      budget: "$300 - $500",
    },
  ];
  const sentProposals = [
    {
      job: "E-commerce SEO Specialist",
      status: "Pending",
      price: "Fixed: $1,500",
    },
    {
      job: "React Native Mobile App",
      status: "Interview",
      price: "$35/hr",
    },
  ];
  const hiredFreelancers = [
    {
      name: "Jane Doe",
      role: "Web Designer",
      status: "Working",
    },
  ];
  const portfolio = [
    {
      preview: "Project Preview",
      title: "Add Your First Project",
      desc: "Showcase your best work to attract clients.",
    },
  ];

  const dualRoleTips = [
    "Switch between hiring and working easily from your dashboard.",
    "Keep your profile complete for both roles to maximize your opportunities.",
    "Check messages from both freelancers and clients regularly.",
  ];

  return (
    <main className="free-main-content">
      {/* Welcome */}
      <section className="free-welcome-section">
        <h1>
          Welcome Back! <span role="img" aria-label="wave">👋</span>
        </h1>
        <p>
          You are active as both a <b>Client</b> and a <b>Freelancer</b>.<br />
          Here’s a summary of your activities and quick access to your essential features.
        </p>
      </section>

      {/* Combined Stats */}
      <div className="free-stats-container">
        {combinedStats.map(({ icon, className, value, label }, idx) => (
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
        {/* Left: Freelancer */}
        <div className="left-column">
          {/* Freelancer Proposals */}
          <div className="free-card">
            <div className="free-section-title">
              <h2>
                <i className="fas fa-paper-plane"></i> Proposals Sent
              </h2>
            </div>
            {sentProposals.length === 0 ? (
              <div style={{ color: "#94a3b8" }}>No proposals sent yet.</div>
            ) : (
              sentProposals.map((p, idx) => (
                <div className="free-job-card" key={idx}>
                  <h4>{p.job}</h4>
                  <div className="free-job-footer">
                    <div className="free-job-price">{p.price}</div>
                    <span style={{ color: "#4361ee", fontWeight: 500 }}>{p.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Freelancer Portfolio */}
          <div className="free-section-title">
            <h2>
              <i className="fas fa-briefcase"></i> Portfolio
            </h2>
          </div>
          <div className="free-portfolio-showcase">
            {portfolio.map((item, idx) => (
              <div className="free-portfolio-item" key={idx}>
                <div className="free-portfolio-image">{item.preview}</div>
                <div className="free-portfolio-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Client */}
        <div className="right-column">
          {/* Client Jobs Posted */}
          <div className="free-card">
            <div className="free-section-title">
              <h2>
                <i className="fas fa-clipboard-list"></i> Jobs Posted
              </h2>
            </div>
            {postedJobs.length === 0 ? (
              <div style={{ color: "#94a3b8" }}>No jobs posted yet.</div>
            ) : (
              postedJobs.map((job, idx) => (
                <div className="free-job-card" key={idx}>
                  <h4>{job.title}</h4>
                  <div className="free-job-footer">
                    <div className="free-job-price">{job.budget}</div>
                    <span style={{ color: "#4361ee", fontWeight: 500 }}>{job.status}</span>
                    <span style={{ color: "#06d6a0" }}>{job.proposals} Proposals</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Hired Freelancers */}
          <div className="free-card">
            <div className="free-section-title">
              <h2>
                <i className="fas fa-users"></i> Freelancers Hired
              </h2>
            </div>
            {hiredFreelancers.length === 0 ? (
              <div style={{ color: "#94a3b8" }}>No freelancers hired yet.</div>
            ) : (
              hiredFreelancers.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 600, color: "#4361ee"
                  }}>
                    {f.name[0]}
                  </div>
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
        </div>
      </div>

      {/* Tips */}
      <div className="free-card" style={{ marginTop: "2rem" }}>
        <div className="free-section-title">
          <h2>
            <i className="fas fa-lightbulb"></i> Tips for Dual-role Users
          </h2>
        </div>
        <ul style={{ color: "#1e293b", marginLeft: "1.5rem" }}>
          {dualRoleTips.map((tip, idx) => (
            <li key={idx} style={{ margin: "0.5rem 0" }}>{tip}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default BothDashboard;