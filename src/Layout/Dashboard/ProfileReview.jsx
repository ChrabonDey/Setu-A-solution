import React, { useState } from 'react';
import './ProfileReview.css';

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

      <div className="profile-review-main">
        <div className="profile-review-top-left">
          <h2>Reviews Overview</h2>
        </div>
        <div className="profile-review-top-right">
          <div className="profile-review-right-card">
            <div className="profile-review-right-card-content">
              <div className="profile-review-right-card-title">Your Overall Rating</div>
              <div className="profile-review-right-card-rating">
                <span style={{ fontSize: "2rem", fontWeight: 700 }}>4.7</span>
                <span style={{ marginLeft: 8, color: "#ffc107", fontSize: "1.5rem" }}>★</span>
              </div>
              <div className="profile-review-right-card-desc">
                Based on 15 reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReview;