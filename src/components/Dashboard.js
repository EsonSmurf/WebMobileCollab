import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown/modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    }
    if (showProfileDropdown || showNotificationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showNotificationDropdown]);

  const electionData = {
    registeredVoters: 100,
    votesCast: 365,
    candidates: [
      { position: 'President', name: 'Lei Anysson Marquez', yearLevel: 'BSIT3A', votes: 100 },
      { position: 'Vice President', name: 'Grace Bayonito', yearLevel: 'BSIT3A', votes: 100 },
      { position: 'Secretary', name: 'Kurt Papruz', yearLevel: 'BSIT3A', votes: 100 },
      { position: 'Assistant Secretary', name: 'Jayson Visnar', yearLevel: 'BSIT3A', votes: 100 },
      { position: 'Treasurer', name: 'Lei Anysson Marquez', yearLevel: 'BSIT3A', votes: 100 },
    ]
  };

  const chartData = {
    labels: ['President', 'Vice President', 'Secretary', 'Treasurer'],
    datasets: [
      {
        data: [100, 100, 100, 100],
        backgroundColor: ['#0066CC', '#4CAF50', '#FFC107', '#FF9800'],
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
        ticks: {
          stepSize: 100
        },
        grid: {
          display: true
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <>
      <div className="dashboard-bg"></div>
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="logo-container">
            <img src="/svs-logo.png" alt="SVS Logo" className="logo" />
          </div>
          <nav className="nav-menu">
            <Link to="/dashboard" className="nav-item active">
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
        
        <main className="main-content">
          <header className="top-bar">
            <h2 className="school-nme">STI College Balagtas</h2>
            <div className="header-right">
              <div className="notifications" onClick={() => setShowNotificationDropdown(prev => !prev)}>
                <img src="/icons-notification.png" alt="Notifications" />
              </div>
              {showNotificationDropdown && (
                <div ref={notificationDropdownRef} className="notification-dropdown">
                  <h4>Notifications</h4>
                  <p>Upcoming election for the Student Government starts on <strong>May 10, 2025 at 10:00AM</strong></p>        
                  <p>_______________________________________________________</p>
                  <p>Upcoming BITS Organization election starts on <strong>May 5, 2025 at 10:00AM</strong></p>
         
                </div>
              )}
              <div className="user-profile" style={{ position: 'relative' }}>
                <img
                  src="/icons-profile.png"
                  alt="User Profile"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                />
                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div
                    ref={profileDropdownRef}
                    style={{
                      position: 'absolute',
                      top: '48px',
                      right: 0,
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                      width: '320px',
                      zIndex: 1000,
                      padding: '1.5rem 1.5rem 1rem 1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#E5F0FB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem',
                      }}>
                        <img src="/icons-profile.png" alt="Profile" style={{ width: 40, height: 40 }} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 0 }}>Jayson Visnar</div>
                      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Visnar.302857@Balagtas.sti.edu.ph</div>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0066CC',
                          fontWeight: 500,
                          fontSize: 15,
                          marginBottom: 16,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                        onClick={() => {
                          setShowProfileDropdown(false);
                          navigate('/profile');
                        }}
                      >
                        Manage your Student Voting System Account
                      </button>
                      <button
                        style={{
                          width: '100%',
                          background: '#0066CC',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '12px 0',
                          fontWeight: 600,
                          fontSize: 18,
                          cursor: 'pointer',
                          marginBottom: 8,
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Logout
                        
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Profile Modal */}
          {showProfileModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.15)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
              onClick={() => setShowProfileModal(false)}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  padding: '2rem',
                  minWidth: 600,
                  maxWidth: '90vw',
                  position: 'relative',
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: '#E5F0FB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 32,
                  }}>
                    <img src="/icons-profile.png" alt="Profile" style={{ width: 90, height: 90 }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 36 }}>Jayson Visnar</div>
                    <div style={{ color: '#888', fontSize: 16, marginBottom: 8 }}>Making your journey uniquely yours</div>
                  </div>
                  <button
                    style={{
                      marginLeft: 'auto',
                      background: '#0066CC',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 24px',
                      fontWeight: 600,
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setShowProfileModal(false);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0' }} />
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Email</div>
                <div style={{ fontSize: 18, marginBottom: 16 }}>visnar@gmail.com</div>
                <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0' }} />
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Date of Birth</div>
                <div style={{ fontSize: 18, marginBottom: 16 }}>March 15, 2003</div>
                <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0' }} />
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Faculty</div>
                <div style={{ fontSize: 18, marginBottom: 16 }}>BSIT3A</div>
                <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0' }} />
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Organization</div>
                <div style={{ fontSize: 18, marginBottom: 16 }}>BITS</div>
              </div>
            </div>
          )}

          {/* Edit Profile Modal */}
          {showEditModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.15)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
              onClick={() => setShowEditModal(false)}
            >
              <div
                style={{
                  background: '#0066CC',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  padding: '2rem',
                  minWidth: 500,
                  maxWidth: '90vw',
                  position: 'relative',
                  color: '#fff',
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, textAlign: 'center' }}>Edit Profile</div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <label style={{ fontWeight: 600 }}>First Name
                    <input style={{ width: '100%', padding: 8, borderRadius: 6, border: 'none', marginTop: 4 }} defaultValue="Jayson" />
                  </label>
                  <label style={{ fontWeight: 600 }}>Middle Name (optional)
                    <input style={{ width: '100%', padding: 8, borderRadius: 6, border: 'none', marginTop: 4 }} defaultValue="" />
                  </label>
                  <label style={{ fontWeight: 600 }}>Last Name
                    <input style={{ width: '100%', padding: 8, borderRadius: 6, border: 'none', marginTop: 4 }} defaultValue="Visnar" />
                  </label>
                  <label style={{ fontWeight: 600 }}>Date of Birth
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <select defaultValue="March" style={{ flex: 1, padding: 8, borderRadius: 6, border: 'none' }}>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                      </select>
                      <select defaultValue="15" style={{ flex: 1, padding: 8, borderRadius: 6, border: 'none' }}>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                      </select>
                      <select defaultValue="2003" style={{ flex: 1, padding: 8, borderRadius: 6, border: 'none' }}>
                        <option>2003</option>
                        <option>2004</option>
                        <option>2005</option>
                      </select>
                    </div>
                  </label>
                  <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                    <button
                      type="submit"
                      style={{ flex: 1, background: '#FFD700', color: '#222', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, cursor: 'pointer' }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      style={{ flex: 1, background: '#fff', color: '#222', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, cursor: 'pointer' }}
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <div style={{ position: 'absolute', top: 24, right: 24 }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: '#E5F0FB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: -100,
                    border: '4px solid #fff',
                  }}>
                    <img src="/icons-profile.png" alt="Profile" style={{ width: 60, height: 60 }} />
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      background: '#fff',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #0066CC',
                    }}>
                      <span style={{ color: '#0066CC', fontWeight: 700, fontSize: 22 }}>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="content-area">
           

            <div className="stats-cards">
              <div className="stat-card">
                <h3>Registered Voters</h3>
                <p className="stat-number">{electionData.registeredVoters}</p>
              </div>
              <div className="stat-card">
                <h3>Votes Cast</h3>
                <p className="stat-number">{electionData.votesCast}</p>
              </div>
            </div>

            <div className="election-overview">
              <h2>Election Overview</h2>
              <p className="date">April 30, 2025</p>
              <div className="table-container">
                <table className="candidates-table">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th></th>
                      <th>Name</th>
                      <th>Year & Level</th>
                      <th>Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electionData.candidates.map((candidate, index) => (
                      <tr key={index}>
                        <td>{candidate.position}</td>
                        <td>-</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.yearLevel}</td>
                        <td className="votes">{candidate.votes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-navigation">
              <button className="nav-btn prev">Previous</button>
              <button className="nav-btn next">Next</button>
              </div>
            </div>

            <div className="turnout-analytics">
              <div className="analytics-header">
                <h2>Turnout Analytics</h2>
                <span className="update-time">As of today</span>
              </div>
              <div className="chart-container">
                <Bar data={chartData} options={chartOptions} height={300} />
              </div>
              <div className="chart-update-time">
                data updated 3 minutes ago
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard; 