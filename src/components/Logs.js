import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Logs.css';

const Logs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const profileDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleExportLogs = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/export-logs');
            setIsLoading(false); // Reset loading state after navigation
        }, 800); // 0.8 seconds
    };

    return (
        <div className="dashboard-container">
            {/* Top Bar removed */}
            <aside className="sidebar">
                <div className="logo-container">
                    <img src="/svs-logo.png" alt="SVS Logo" className="logo" />
                </div>
                <nav className="nav-menu">
                    <Link to="/dashboard" className="nav-item">
                        <img src="/icons-dashboard.png" alt="Dashboard Icon" />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/voters" className="nav-item">
                        <img src="/icons-voters.png" alt="Voters Icon" />
                        <span>Voters</span>
                    </Link>
                    <Link to="/candidates" className="nav-item">
                        <img src="/icons-candidates.png" alt="Candidates Icon" />
                        <span>Candidates</span>
                    </Link>
                    <Link to="/elections" className="nav-item">
                        <img src="/icons-elections.png" alt="Elections Icon" />
                        <span>Elections</span>
                    </Link>
                    <Link to="/logs" className="nav-item active">
                        <img src="/icons-logs.png" alt="Logs Icon" />
                        <span>Logs</span>
                    </Link>
                    <Link to="/results" className="nav-item">
                        <img src="/icons-resultsAnalytics.png" alt="Results & Analytics Icon" />
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
            <div className="content-area">
            <div className="elections-header">
            <h2>Logs</h2>
                    <button onClick={handleExportLogs} className="export-logs-btn" disabled={isLoading}>
                        {'Export Logs'}
                    </button>
                </div>
                <div className="logs-cards-container">
                    {/* Audit Log Card */}
                    <div className="log-card">
                        <h3  className="log-card-title">Audit Log</h3>
                        <table className="log-table">
                            <thead>
                                <tr>
                                    <th>Date Changed</th>
                                    <th>Position</th>
                                    <th>History Log</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>April 20, 2025, 7:42PM, Philippine Standard Time</td>
                                    <td>Jayson Visnar</td>
                                    <td className="signed-in">Signed In.</td>
                                </tr>
                                <tr>
                                    <td>April 20, 2025, 7:42PM, Philippine Standard Time</td>
                                    <td>Jayson Visnar</td>
                                    <td className="signed-out">Signed Out.</td>
                                </tr>
                                <tr>
                                    <td>April 20, 2025, 7:42PM, Philippine Standard Time</td>
                                    <td>Jayson Visnar</td>
                                    <td className="signed-in">Signed In.</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="log-card-footer">
                            <span className="items-info">1 of 50 items</span>
                            <div className="pagination-controls">
                                <span className="page-text">Page</span>
                                <span className="page-number">1</span>
                                <span className="page-text">of 22</span>
                                <span className="nav-arrow">&#8594;</span>
                            </div>
                        </div>
                    </div>
                    {/* Activity Log Card */}
                    <div className="log-card">
                        <h2 className="log-card-title">Activity Log</h2>
                        <table className="log-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Position</th>
                                    <th>Event</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>April 20, 2025, 7:42PM, Philippine Standard Time</td>
                                    <td>Jayson Visnar</td>
                                    <td>Created BITS Officer Election</td>
                                </tr>
                                <tr>
                                    <td>April 20, 2025, 7:42PM, Philippine Standard Time</td>
                                    <td>Jayson Visnar</td>
                                    <td>Created BITS Officer Election</td>
                                </tr>
                                <tr>
                                    <td>April 20, 2025, 7:42PM, Philippine Standard Time</td>
                                    <td>Jayson Visnar</td>
                                    <td>Created BITS Officer Election</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="log-card-footer">
                            <span className="items-info">1 of 50 items</span>
                            <div className="pagination-controls">
                                <span className="page-text">Page</span>
                                <span className="page-number">1</span>
                                <span className="page-text">of 22</span>
                                <span className="nav-arrow">&#8594;</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};

export default Logs; 