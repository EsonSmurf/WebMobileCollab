import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const notifications = [
  { date: 'April 21, 2025', message: 'Upcoming election for the Student Government starts on May 10, 2025 at 10:00AM.' },
  { date: 'April 20, 2025', message: 'Upcoming BITS Organization election starts on May 5, 2025 at 10:00AM.' },
  // Add more notifications as needed
];

const AllNotifications = () => {
  return (
    <>
      {/* Top Bar */}
      <header className="top-bar">
        <h2 className="school-nme">STI College Balagtas</h2>
        <div className="header-right">
          <div className="notifications">
            <Link to="/notifications">
              <img src="/icons-notification.png" alt="Notifications" />
            </Link>
          </div>
          <div className="user-profile" style={{ position: 'relative' }}>
            <img
              src="/icons-profile.png"
              alt="User Profile"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </header>

      {/* Navbar */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/svs-logo.png" alt="SVS Logo" className="logo" />
        </div>
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item">
            <img src="/icons-dashboard.png" alt="" />
            <span>Dashboard</span>
          </Link>
          <Link to="/voters" className="nav-item">
            <img src="/icons-voters.png" alt="" />
            <span>Voters</span>
          </Link>
          <Link to="/candidates" className="nav-item">
            <img src="/icons-candidates.png" alt="" />
            <span>Candidates</span>
          </Link>
          <Link to="/elections" className="nav-item">
            <img src="/icons-elections.png" alt="" />
            <span>Elections</span>
          </Link>
          <Link to="/logs" className="nav-item">
            <img src="/icons-logs.png" alt="" />
            <span>Logs</span>
          </Link>
          <Link to="/results" className="nav-item">
            <img src="/icons-resultsAnalytics.png" alt="" />
            <span>Results & Analytics</span>
          </Link>
        </nav>
      </aside>

      {/* Notifications Content */}
      <div className="all-notifications-container">
        <h2>All Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} className="notification-card">
            <div className="notification-date">{notification.date}</div>
            <div className="notification-message">{notification.message}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllNotifications;
