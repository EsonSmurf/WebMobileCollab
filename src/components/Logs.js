import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Logs.css';

const Logs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const profileDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        }
        if (showProfileDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfileDropdown]);

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
                        <div className="notifications">
                            <img src="/icons-notification.png" alt="Notifications" />
                        </div>
                        <div className="user-profile">
                            <img src="/icons-profile.png" alt="User Profile" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')} />
                        </div>
                    </div>
                </header>
            <div className="content-area">
            <div className="elections-header">
            <h2>Logs</h2>
                    <button className="export-logs-btn">Export Logs</button>
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