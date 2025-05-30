import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import './Results.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Results = () => {
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const profileDropdownRef = useRef(null);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const notificationDropdownRef = useRef(null);
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

    // Data for Result per Candidate table
    const candidateResults = [
        { position: 'President', candidate: 'Lei Anysson Marquez', votes: 65 },
        { position: 'Vice President', candidate: 'Grace Bayonito', votes: 32 },
        { position: 'Secretary', candidate: 'Kurt Papruz', votes: 15 }
    ];

    // Data for Election Results bar chart
    const electionData = {
        labels: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Rep', 'Rep', 'Rep', 'Rep'],
        datasets: [
            {
                label: 'Party 1',
                data: [65, 45, 35, 45, 35, 45, 35, 45],
                backgroundColor: '#0066CC',
                barPercentage: 0.8,
            },
            {
                label: 'Party 2',
                data: [35, 25, 45, 35, 45, 35, 45, 35],
                backgroundColor: '#FFE900',
                barPercentage: 0.8,
            }
        ]
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Data for Turnout Percentage pie chart
    const turnoutData = {
        labels: [
            'Number of students who voted',
            "Number of students who didn't"
        ],
        datasets: [{
            data: [75, 25],
            backgroundColor: ['#0066CC', '#FFE900']
        }]
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14
                    },
                    boxWidth: 24,
                    padding: 20
                }
            }
        }
    };

    // Elected Officers data
    const electedOfficers = [
        { name: 'Lei Anysson Marquez', position: 'President', photo: '/default-avatar.png' },
        { name: 'Kurt Papruz', position: 'Vice President', photo: '/default-avatar.png' },
        { name: 'Cardo Dalisay', position: 'Secretary', photo: '/default-avatar.png' },
        { name: 'Cardo Dalisay', position: 'Asst. Secretary', photo: '/default-avatar.png' },
        { name: 'Grace Bayonito', position: 'Treasurer', photo: '/default-avatar.png' },
        { name: 'Jayson Visnar', position: 'Asst. Treasurer', photo: '/default-avatar.png' },
        { name: 'Tangol Dalisay', position: 'Auditor', photo: '/default-avatar.png' },
        { name: 'Tangol Dalisay', position: 'P.R.O', photo: '/default-avatar.png' }
    ];

    return (
        <div className="dashboard-container">
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
                    <Link to="/logs" className="nav-item">
                        <img src="/icons-logs.png" alt="Logs Icon" />
                        <span>Logs</span>
                    </Link>
                    <Link to="/results" className="nav-item active">
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
                            <img src="/icons-profile.png" alt="User Profile" style={{ cursor: 'pointer' }} onClick={() => setShowProfileDropdown((prev) => !prev)} />
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
                    <div className="results-container">
                        <div className="results-header">
                            <h1>Results & Analytics</h1>
                            <button className="export-btn">Export</button>
                        </div>

                        {/* Result per Candidate Section */}
                        <div className="results-section">
                            <div className="section-header">
                                <h2>Result per Candidate</h2>
                                <button className="refresh-btn">↻</button>
                            </div>
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Position</th>
                                        <th>Candidate</th>
                                        <th>Votes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidateResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.position}</td>
                                            <td>{result.candidate}</td>
                                            <td className="votes">{result.votes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="table-navigation">
                                <button className="nav-btn prev">Previous</button>
                                <button className="nav-btn next">Next</button>
                            </div>
                        </div>

                        {/* Election Results Chart Section */}
                        <div className="results-section">
                            <div className="section-header">
                                <h2>Election Results</h2>
                                <button className="refresh-btn">↻</button>
                            </div>
                            <div className="chart-container">
                                <Bar data={electionData} options={barOptions} />
                            </div>
                        </div>

                        {/* Elected Officers Section */}
                        <div className="results-section">
                            <h2>Elected Officer's</h2>
                            <div className="officers-grid">
                                {electedOfficers.map((officer, index) => (
                                    <div key={index} className="officer-card">
                                        <div className="officer-photo">
                                            <img src={officer.photo} alt={officer.name} />
                                        </div>
                                        <div className="officer-info">
                                            <h3>{officer.name}</h3>
                                            <p>{officer.position}</p>
                                        </div>
                                        <div className="verification-badge">✓</div>
                                    </div>
                                ))}
                            </div>
                            <div className="table-navigation">
                                <button className="nav-btn prev">Previous</button>
                                <button className="nav-btn next">Next</button>
                            </div>
                        </div>

                        {/* Turnout Percentage Section */}
                        <div className="results-section">
                            <h2>Turnout Percentage %</h2>
                            <div className="pie-chart-container">
                                <Pie data={turnoutData} options={pieOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Results; 