import React, { useState } from 'react';
import './ProfileReview.css';

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

const ProfileReview = () => {
  const freelancerReviews = [
    {
      type: 'Profile Reviews',
      count: 0,
      icon: 'https://img.icons8.com/ios-filled/50/000000/prize.png',
    },
    {
      type: 'Job Reviews',
      count: 0,
      icon: 'https://img.icons8.com/ios-filled/50/000000/combo-chart--v1.png',
    },
    {
      type: 'Skill Endorsements',
      count: 0,
      icon: 'https://img.icons8.com/ios-filled/50/000000/certificate.png',
    },
  ];

  const clientReviews = [
    {
      type: 'Profile Reviews',
      count: 0,
      icon: 'https://img.icons8.com/ios-filled/50/000000/prize.png',
    },
    {
      type: 'Payment Reviews',
      count: 0,
      icon: 'https://img.icons8.com/ios-filled/50/000000/money.png',
    },
    {
      type: 'Project Feedback',
      count: 0,
      icon: 'https://img.icons8.com/ios-filled/50/000000/comments.png',
    },
  ];

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
          {currentData.map((item, index) => (
            <div className="card" key={index}>
              <div className="icon-box">
                <img src={item.icon} alt={item.type} />
              </div>
              <div className="content">
                <div className="count">{item.count}</div>
                <div className="label">{item.type}</div>
              </div>
            </div>
          ))}
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