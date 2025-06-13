import React, { useState } from 'react';
import {
  FaAward,
  FaChartLine,
  FaCertificate,
  FaMoneyBillWave,
  FaComments,
} from 'react-icons/fa';
import './ProfileReview.css';

// Helper for light background color from a color hex
function getLightBg(hex, factor = 0.85) {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  // Convert r,g,b
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);

  // Blend with white
  r = Math.round(r + (255 - r) * factor);
  g = Math.round(g + (255 - g) * factor);
  b = Math.round(b + (255 - b) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

const ICONS = {
  profile: {
    icon: <FaAward />,
    color: '#1976d2', // blue
  },
  job: {
    icon: <FaChartLine />,
    color: '#388e3c', // green
  },
  skill: {
    icon: <FaCertificate />,
    color: '#ff9800', // orange
  },
  payment: {
    icon: <FaMoneyBillWave />,
    color: '#8e24aa', // purple
  },
  project: {
    icon: <FaComments />,
    color: '#d32f2f', // red
  },
};

const businessReviews = [
  {
    name: "Alice Johnson",
    photo: "https://img.icons8.com/ios-filled/48/user-male-circle.png",
    date: "Jun 10, 2025",
    type: "Project",
    typeIcon: "https://img.icons8.com/ios-filled/30/briefcase.png",
    stars: 5,
    comment: "Alice exceeded expectations on the landing page redesign. Highly recommended!",
  },
  {
    name: "Bob Smith",
    photo: "https://img.icons8.com/ios-filled/48/user-male-circle.png",
    date: "May 28, 2025",
    type: "Payment",
    typeIcon: "https://img.icons8.com/ios-filled/30/money.png",
    stars: 4,
    comment: "Quick payment and clear requirements. Would work with Bob again.",
  },
  {
    name: "Eve Williams",
    photo: "https://img.icons8.com/ios-filled/48/user-female-circle.png",
    date: "May 19, 2025",
    type: "Skills",
    typeIcon: "https://img.icons8.com/ios-filled/30/certificate.png",
    stars: 5,
    comment: "Expert in React and Node.js. Deliverables were polished and on time.",
  },
];

const freelancerReviews = [
  {
    type: 'Profile Reviews',
    count: 0,
    iconKey: 'profile',
  },
  {
    type: 'Job Reviews',
    count: 0,
    iconKey: 'job',
  },
  {
    type: 'Skill Endorsements',
    count: 0,
    iconKey: 'skill',
  },
];

const clientReviews = [
  {
    type: 'Profile Reviews',
    count: 0,
    iconKey: 'profile',
  },
  {
    type: 'Payment Reviews',
    count: 0,
    iconKey: 'payment',
  },
  {
    type: 'Project Feedback',
    count: 0,
    iconKey: 'project',
  },
];

const ProfileReview = () => {
  const [role, setRole] = useState('freelancer');
  const currentData = role === 'freelancer' ? freelancerReviews : clientReviews;

  return (
    <div className="profile-review-page">
      <div className="profile-review-wrapper">
        <div className="toggle-buttons">
          <button
            className={role === 'freelancer' ? 'active' : ''}
            onClick={() => setRole('freelancer')}
          >
            Freelancer
          </button>
          <button
            className={role === 'client' ? 'active' : ''}
            onClick={() => setRole('client')}
          >
            Client
          </button>
        </div>
        <div className="toggle-separator"></div>
        <div className="cards-container">
          {currentData.map((item, index) => {
            const iconData = ICONS[item.iconKey];
            const bgColor = getLightBg(iconData.color);
            return (
              <div className="card" key={index}>
                <span
                  className="profile-icon"
                  style={{
                    color: iconData.color,
                    backgroundColor: bgColor,
                  }}
                >
                  {iconData.icon}
                </span>
                <div className="content">
                  <div className="count">{item.count}</div>
                  <div className="label">{item.type}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="profile-review-main clean-business-review-main">
        <div className="clean-summary center-summary">
          <div>
            <div className="clean-summary-score-row">
              <span className="clean-summary-score">4.7</span>
              <span className="clean-summary-star">★</span>
            </div>
            <div className="clean-summary-reviews">15 reviews</div>
          </div>
        </div>
        <div className="clean-business-review-list">
          {businessReviews.map((r, i) => (
            <div className="clean-business-review-card" key={i}>
              <div className="reviewers">
                <img className="clean-review-photo" src={r.photo} alt={r.name} />
                <span className="clean-reviewer-name">{r.name}</span>
              </div>
              <div className="clean-review-content">
                <div className="clean-review-comment">{r.comment}</div>
                <div className="review-details">
                  <span className="clean-review-type">
                    <img src={r.typeIcon} alt={r.type} className="clean-type-icon" />
                    {r.type}
                  </span>
                  <span className="clean-review-date">{r.date}</span>
                  <span className="clean-review-stars">
                    {Array.from({ length: 5 }).map((_, idx) =>
                      <span key={idx} className={idx < r.stars ? "star filled" : "star"}>★</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileReview;