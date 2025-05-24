import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Candidates.css';
import editIcon from '../assets/icons-edit.svg';
import deleteIcon from '../assets/icons-delete.svg';

const Candidates = () => {
    const [selectedPosition, setSelectedPosition] = useState('All Positions');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    
    const candidates = [
        { name: 'Grace Bayonito', position: 'Vice President', photo: '/default-avatar.png' },
        { name: 'Kurt Papruz', position: 'Secretary', photo: '/default-avatar.png' },
        { name: 'Lei Anysson Marquez', position: 'President', photo: '/default-avatar.png' },
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
                    <Link to="/candidates" className="nav-item active">
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
                    <div className="candidates-header">
                        <h2>Candidate Management</h2>
                      
                    </div>

                    <div className="candidates-container">
                        <div className="candidates-list-header">
                            <h3>Candidate List</h3>
                            <div className="position-filter">
                                <select 
                                    value={selectedPosition}
                                    onChange={(e) => setSelectedPosition(e.target.value)}
                                    className="position-select"
                                >
                                    <option>Filter per organization</option>
                                    <option>BITS</option>
                                    <option>BALARAW</option>
                                    <option>BALANI</option>
                                    <option>BIGHANI</option>
                                    <option>BALANSA - JPIA A/AT</option>
                                    <option>JPMAP</option>
                                    <option>BUNTALA</option>
                                    <option>BALANTOK</option>
                                   
                                   
                                </select>
                            </div>
                        </div>

                        <div className="candidates-table">
                            <table className="candidates-table">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th className="actions-column">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map((candidate, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="candidate-photo">
                                                    <img src={candidate.photo} alt={candidate.name} />
                                                </div>
                                            </td>
                                            <td className="candidate-name">{candidate.name}</td>
                                            <td className="candidate-position">{candidate.position}</td>
                                            <td className="actions-column">
                                                <div className="action-buttons">
                                                    <button className="edit-btn" aria-label="Edit">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.13 2.87a1.5 1.5 0 0 1 2.12 2.12l-7.5 7.5-2.5.38.38-2.5 7.5-7.5z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#EBF5FF"/>
                                                        </svg>
                                                    </button>
                                                    <button className="delete-btn" aria-label="Delete">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2 4H14" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M6.66667 7.33333V11.3333" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M9.33333 7.33333V11.3333" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <span className="page-info">1 of 5 pages</span>
                            <div className="page-numbers">
                                <button className="page-btn active">1</button>
                                <button className="page-btn">2</button>
                                <button className="page-btn">3</button>
                                <button className="page-btn">4</button>
                                <button className="page-btn">5</button>
                                <button className="next-btn">
                                    <img src="/icons-next.png" alt="Next" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Candidates; 