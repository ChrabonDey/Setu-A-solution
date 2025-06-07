import React from "react";
import "./FreelancerDashboard.css"; // Move the style block to this CSS file

const FreelancerDashboard = () => {
  // Simulate state for onboarding progress (could use useState for real app)
  const [profileProgress, setProfileProgress] = React.useState(75);
  const [onboarding, setOnboarding] = React.useState([
    { title: "Add Profile Photo", desc: "Help clients recognize you", completed: true },
    { title: "Verify Identity", desc: "Build trust with clients", completed: true },
    { title: "Add Portfolio Items", desc: "Showcase your best work", completed: false, btn: "Add" },
    { title: "Set Hourly Rate", desc: "Earn what you're worth", completed: false, btn: "Set" },
  ]);

  // Handle onboarding click
  const handleOnboardingClick = (idx) => {
    if (!onboarding[idx].completed) {
      const newOnboarding = onboarding.map((item, i) =>
        i === idx ? { ...item, completed: true, btn: "Completed" } : item
      );
      setOnboarding(newOnboarding);
      // Simulate profile progress to 100% after any click
      setProfileProgress(100);
    }
  };

  // Job cards data
  const jobs = [
    {
      title: "Website Redesign for Tech Company",
      badge: "Urgent",
      meta: [
        { icon: "fa-clock", text: "2 days ago" },
        { icon: "fa-map-marker-alt", text: "Remote" },
        { icon: "fa-briefcase", text: "Web Design" },
      ],
      desc:
        "Looking for an experienced designer to redesign our corporate website with modern aesthetics and improved UX.",
      price: "$1,200 - $2,500",
    },
    {
      title: "React Native Mobile App Developer",
      badge: null,
      meta: [
        { icon: "fa-clock", text: "5 hours ago" },
        { icon: "fa-map-marker-alt", text: "Worldwide" },
        { icon: "fa-briefcase", text: "Mobile Development" },
      ],
      desc:
        "Need a React Native developer to build a cross-platform mobile app with Firebase backend integration.",
      price: "$35 - $50/hr",
    },
    {
      title: "E-commerce SEO Specialist",
      badge: null,
      meta: [
        { icon: "fa-clock", text: "1 day ago" },
        { icon: "fa-map-marker-alt", text: "USA Only" },
        { icon: "fa-briefcase", text: "SEO & Marketing" },
      ],
      desc:
        "Seeking SEO expert to optimize product pages and improve organic traffic for fashion e-commerce store.",
      price: "Fixed: $1,500",
    },
  ];

  // Portfolio placeholder data
  const portfolio = [
    {
      preview: "Project Preview",
      title: "Add Your First Project",
      desc: "Showcase your best work to attract clients.",
    },
    {
      preview: "Work Preview",
      title: "Portfolio Placeholder",
      desc: "Upload your projects to stand out.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "Complete your profile to appear in more client searches and increase your chances of getting hired.",
      author: "Alex Johnson",
      role: "Top-rated Freelancer",
    },
    {
      quote:
        "Apply to jobs within the first hour of posting for the best chance of getting noticed by clients.",
      author: "Sarah Williams",
      role: "Freelance Designer",
    },
    {
      quote:
        "Clients love to see portfolio items that demonstrate your skills and past successful projects.",
      author: "Michael Chen",
      role: "Development Expert",
    },
  ];

  // Stat cards data
  const statCards = [
    {
      icon: "fa-briefcase",
      className: "icon-blue",
      value: "0",
      label: "Job Proposals",
    },
    {
      icon: "fa-dollar-sign",
      className: "icon-green",
      value: "$0",
      label: "Earned this month",
    },
    {
      icon: "fa-star",
      className: "icon-purple",
      value: "0",
      label: "Client Rating",
    },
  ];

  // Handlers for effect (hover/click)
  React.useEffect(() => {
    // Portfolio item click handler for navigation (simulate route or anchor)
    const handlePortfolioClick = (e) => {
      e.preventDefault();
      window.location.hash = "#add-project";
    };
    const items = document.querySelectorAll(".portfolio-item");
    items.forEach((item) => {
      item.addEventListener("click", handlePortfolioClick);
    });
    return () => {
      items.forEach((item) => {
        item.removeEventListener("click", handlePortfolioClick);
      });
    };
  }, []);

  return (
    <main className="main-content">
      <section className="welcome-section">
        <h1>Get Started, John! <span role="img" aria-label="wave">👋</span></h1>
        <p>
          Ready to find your next project? Complete your profile to get matched with the best opportunities.
        </p>
      </section>

      {/* Stats Cards */}
      <div className="stats-container">
        {statCards.map(({ icon, className, value, label }, idx) => (
          <div className="stat-card" key={idx}>
            <div className={`stat-icon ${className}`}>
              <i className={`fas ${icon}`}></i>
            </div>
            <div className="stat-info">
              <h3>{value}</h3>
              <p>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Showcase */}
      <div className="section-showcase">
        <div className="section-title">
          <h2>
            <i className="fas fa-briefcase"></i> Showcase Your Work
          </h2>
          <a href="#add-project">
            Add Project <i className="fas fa-plus"></i>
          </a>
        </div>
        <div className="portfolio-showcase">
          {portfolio.map((item, idx) => (
            <div className="portfolio-item" key={idx}>
              <div className="portfolio-image">{item.preview}</div>
              <div className="portfolio-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Onboarding Card */}
          <div className="card onboarding-card">
            <h3>
              <i className="fas fa-tasks"></i> Complete Your Profile
            </h3>
            <div className="progress-container">
              <div className="progress-header">
                <span>Profile Strength</span>
                <span>{profileProgress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: profileProgress + "%" }}
                ></div>
              </div>
            </div>
            {onboarding.map((item, idx) => (
              <div
                className={`onboarding-item${item.completed ? " completed" : ""}`}
                key={idx}
                onClick={() => handleOnboardingClick(idx)}
                style={{ cursor: item.completed ? "default" : "pointer" }}
              >
                <div className="check-circle">
                  <i className={`fas ${item.completed ? "fa-check" : "fa-plus"}`}></i>
                </div>
                <div className="onboarding-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                {!item.completed && (
                  <button className="btn btn-primary">{item.btn}</button>
                )}
                {item.completed && item.btn && (
                  <button className="btn btn-outline" disabled>
                    {item.btn}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Recommended Jobs */}
          <div className="section-title">
            <h2>
              <i className="fas fa-fire"></i> Recommended Jobs
            </h2>
            <a href="#">
              View all <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="card">
            {jobs.map((job, idx) => (
              <div className="job-card" key={idx}>
                <h4>
                  {job.title}
                  {job.badge && <span className="job-badge">{job.badge}</span>}
                </h4>
                <div className="job-meta">
                  {job.meta.map((m, i) => (
                    <span key={i}>
                      <i className={`fas ${m.icon}`}></i> {m.text}
                    </span>
                  ))}
                </div>
                <p>{job.desc}</p>
                <div className="job-footer">
                  <div className="job-price">{job.price}</div>
                  <button className="btn btn-outline">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Column */}
        <div className="right-column">
          {/* Getting Started */}
          <div className="card">
            <div className="section-title">
              <h2>
                <i className="fas fa-graduation-cap"></i> Getting Started
              </h2>
            </div>
            <p>Boost your freelancing career with these tips:</p>
            {testimonials.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="testimonial-content">
                  <p>{t.quote}</p>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Earnings Potential */}
          <div className="card">
            <div className="section-title">
              <h2>
                <i className="fas fa-chart-line"></i> Your Earning Potential
              </h2>
            </div>
            <p>Based on your skills and experience, you could earn:</p>
            <div className="stat-card" style={{ marginTop: "1rem" }}>
              <div className="stat-icon icon-green">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-info">
                <h3>$5,200/mo</h3>
                <p>Top freelancers in your field</p>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "1.5rem" }}>
              <i className="fas fa-bolt"></i> Boost Your Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FreelancerDashboard;
