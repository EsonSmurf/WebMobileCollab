import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Elections.css';

const Elections = () => {
    const [elections, setElections] = useState([]);
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);  
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showCreateElectionModal, setShowCreateElectionModal] = useState(false);
    const profileDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);

    const [electionTitle, setElectionTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [positions, setPositions] = useState([{ position: '', name: '', photo: null }]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedElection, setSelectedElection] = useState(null);

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

    const handlePositionChange = (index, field, value) => {
        const newPositions = [...positions];
        newPositions[index][field] = value;
        setPositions(newPositions);
    };

    const addPosition = () => {
        setPositions([...positions, { position: '', name: '', photo: null }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Reset error message
        setErrorMessage('');

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

        // Check if start date is in the past
        if (new Date(startDate) < today) {
            setErrorMessage('Start date cannot be in the past.');
            return; // Prevent form submission
        }

        // Check if end date is before start date
        if (new Date(endDate) < new Date(startDate)) {
            setErrorMessage('End date cannot be before start date.');
            return; // Prevent form submission
        }

        const newElection = {
            title: electionTitle,
            startDate: startDate,
            endDate: endDate,
            turnout: "-", // Default value
            status: "Upcoming" // Default status
        };

        if (isEditing) {
            // Update the existing election
            setElections((prevElections) => {
                const updatedElections = [...prevElections];
                updatedElections[editIndex] = newElection; // Update the specific election
                return updatedElections;
            });
            setIsEditing(false); // Reset editing state
        } else {
            // Add a new election
            setElections((prevElections) => [...prevElections, newElection]);
        }

        // Logic to handle form submission to the database (Laravel)
        submitToDatabase(newElection);
        setShowCreateElectionModal(false); // Close modal after submission
    };

    const submitToDatabase = async (newElection) => {
        try {
            const response = await fetch('/api/elections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newElection),
            });
            const data = await response.json();
            console.log('Election created:', data);
        } catch (error) {
            console.error('Error creating election:', error);
        }
    };

    const handleDeleteElection = (index) => {
        // Logic to delete from the database (Laravel)
        // Use fetch or axios to send a delete request

        // Update the state to remove the election
        setElections((prevElections) => prevElections.filter((_, i) => i !== index));
    };

    const handleEditElection = (index) => {
        const electionToEdit = elections[index];
        setElectionTitle(electionToEdit.title);
        setStartDate(electionToEdit.startDate);
        setEndDate(electionToEdit.endDate);
        setEditIndex(index);
        setIsEditing(true);
        setShowCreateElectionModal(true); // Open the modal for editing
    };

    const closeModal = () => {
        setShowCreateElectionModal(false);
        setElectionTitle('');
        setStartDate('');
        setEndDate('');
        setPositions([{ position: '', name: '', photo: null }]);
        setIsEditing(false); // Reset editing state
    };

    const handleViewDetails = async (index) => {
        const electionDetails = elections[index];
        await fetchElectionDetails(electionDetails.id); // Assuming each election has a unique ID
        setSelectedElection(electionDetails);
    };

    const fetchElectionDetails = async (id) => {
        try {
            const response = await fetch(`/api/elections/${id}`); // Adjust the endpoint as needed
            const data = await response.json();
            setSelectedElection(data); // Set the fetched data to state
        } catch (error) {
            console.error('Error fetching election details:', error);
        }
    };

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
                    <Link to="/elections" className="nav-item active">
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
                    <div className="elections-header">
                        <h2>Election Management</h2>
                        <button className="create-election-btn" onClick={() => setShowCreateElectionModal(true)}>Create Election</button>
                    </div>

                    {/* Create Election Modal */}
                    {showCreateElectionModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Create Election</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Election Title:
                                        <input
                                            type="text"
                                            value={electionTitle}
                                            onChange={(e) => setElectionTitle(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Start Date:
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        End Date:
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </label>
                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    {positions.map((pos, index) => (
                                        <div key={index} className="position-row">
                                            <label>
                                                Position:
                                                <select
                                                    value={pos.position}
                                                    onChange={(e) => handlePositionChange(index, 'position', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Position</option>
                                                    <option value="President">President</option>
                                                    <option value="Vice President">Vice President</option>
                                                    {/* Add more positions as needed */}
                                                </select>
                                            </label>
                                            <label>
                                                Name:
                                                <input
                                                    type="text"
                                                    value={pos.name}
                                                    onChange={(e) => handlePositionChange(index, 'name', e.target.value)}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Photo:
                                                <input
                                                    type="file"
                                                    onChange={(e) => handlePositionChange(index, 'photo', e.target.files[0])}
                                                    required
                                                />
                                            </label>
                                        </div>
                                    ))}

                                    <button type="button" onClick={addPosition}>+ Add Position</button>
                                    <div className="form-actions">
                                        <button type="submit">Create Election</button>
                                        <button type="button" onClick={closeModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="elections-list">
                        {elections.map((election, index) => (
                            <div key={index} className="election-card">
                                <div className="election-info">
                                    <h3>{election.title}</h3>
                                    <div className="election-dates">
                                        <p>Start Date: {election.startDate}</p>
                                        <p>End Date: {election.endDate}</p>
                                    </div>
                                </div>
                                <div className="election-stats">
                                    <div className="turnout">
                                        <h4>Turnout %</h4>
                                        <span>{election.turnout}</span>
                                    </div>
                                    <div className="status">
                                        <h4>Status:</h4>
                                        <span className={`status-${election.status.toLowerCase()}`}>
                                            {election.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="election-actions">
                                    <button className="edit-btn" aria-label="Edit" onClick={() => handleEditElection(index)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.13 2.87a1.5 1.5 0 0 1 2.12 2.12l-7.5 7.5-2.5.38.38-2.5 7.5-7.5z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#EBF5FF"/>
                                        </svg>
                                    </button>
                                    <button className="delete-btn" aria-label="Delete" onClick={() => handleDeleteElection(index)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4H14" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M6.66667 7.33333V11.3333" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9.33333 7.33333V11.3333" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <button className="details-btn" onClick={() => handleViewDetails(index)}>See details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {selectedElection && (
                <DetailsModal 
                    election={selectedElection} 
                    onClose={() => setSelectedElection(null)} 
                />
            )}
        </div>
    );
};

const DetailsModal = ({ election, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{election.title}</h2>
                <p>Start Date: {election.startDate}</p>
                <p>End Date: {election.endDate}</p>
                <p>Turnout %: {election.turnout}</p>
                <p>Status: {election.status}</p>
                {/* Add more details as needed */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Elections; 