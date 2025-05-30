import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Voters.css';

const Voters = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50;
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showAddVoterModal, setShowAddVoterModal] = useState(false);
    const [voters, setVoters] = useState([]);
    const profileDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');

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

    const [voterData, setVoterData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        id: '',
        section: '',
        program: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Regular expression to allow only letters
        const lettersOnly = /^[A-Za-z]*$/;

        // Validate only for firstName, middleName, and lastName
        if ((name === 'firstName' || name === 'middleName' || name === 'lastName') && !lettersOnly.test(value)) {
            setErrorMessage("Only letters are allowed in the name fields."); // Set error message
            return; // Prevent updating the state
        } else {
            setErrorMessage(''); // Clear error message if input is valid
        }

        setVoterData({ ...voterData, [name]: value });
    };

    const handleAddVoter = () => {
        // Validate required fields
        if (!voterData.firstName || !voterData.lastName || !voterData.id || !voterData.program) {
            setErrorMessage("Please fill out all required fields."); // Display an alert or error message
            return; // Prevent adding the voter
        }

        // Logic to add voter
        setVoters([...voters, { ...voterData, status: 'Not Voted' }]);
        setShowAddVoterModal(false); // Close modal after adding
        setVoterData({ firstName: '', middleName: '', lastName: '', id: '', section: '', program: '' }); // Reset form
    };

    const handleDeleteVoter = (id) => {
        setVoters(voters.filter(voter => voter.id !== id));
    };

    const programs = [
        'BSIT', 'BSCS', 'BSCPE', 'BMMA', 'BSHM', 'BA', 'BSA', 'BSBA', 'BSTM', 'JPIA A/AT'
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
                    <Link to="/voters" className="nav-item active">
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
                    <div className="voters-management">
                    <div className="management-header">
                            <h1>Voters Management</h1>
                          
                           
                    </div>

                        <div className="voters-content">
                            <div className="voters-header">
                                <h2>Voter List</h2>
                                <div className="header-actions">
                                    <button className="add-btn" onClick={() => setShowAddVoterModal(true)}>
                                        <span>+</span>
                                        Add
                                    </button>
                                    <input type="file" className="upload-btn" />
                                </div>
                            </div>

                            {/* Add Voter Modal */}
                            {showAddVoterModal && (
    <div className="modal">
        <div className="modal-content">
            <h2>Add Voter</h2>
            <form>
                <label>
                    First Name: <span style={{ color: 'red' }}>*</span>
                    <input type="text" name="firstName" value={voterData.firstName} onChange={handleInputChange} required />
                </label>
                <label>
                    Middle Name (optional):
                    <input type="text" name="middleName" value={voterData.middleName} onChange={handleInputChange} />
                </label>
                <label>
                    Last Name: <span style={{ color: 'red' }}>*</span>
                    <input type="text" name="lastName" value={voterData.lastName} onChange={handleInputChange} required />
                </label>
                <label>
                    ID: <span style={{ color: 'red' }}>*</span>
                    <input type="text" name="id" value={voterData.id} onChange={handleInputChange} required />
                </label>
                   
                <label>
                    Program: <span style={{ color: 'red' }}>*</span>
                    <select name="program" value={voterData.program} onChange={handleInputChange} required>
                        <option value="">Select Program</option>
                        {programs.map((program, index) => (
                            <option key={index} value={program}>{program}</option>
                        ))}
                    </select>
                </label>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="modal-actions">
                    <button type="button" className="add-button" onClick={handleAddVoter}>Add</button>
                    <button type="button" className="cancel-button" onClick={() => setShowAddVoterModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
)}

                            <table className="voters-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>ID</th>
                                        <th>Program</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voters.map((voter, index) => (
                                        <tr key={index}>
                                            <td>{voter.firstName} {voter.middleName} {voter.lastName}</td>
                                            <td>{voter.id}</td>
                                            <td>{voter.program}</td>
                                            <td>
                                                <span className={voter.status === 'Voted' ? 'status-voted' : 'status-not-voted'}>
                                                    {voter.status}
                                                </span>
                                            </td>
                                            <td>
                                              <div className="action-buttons">
                                              <button className="delete-btn" aria-label="Delete" onClick={() => handleDeleteVoter(voter.id)}>
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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Voters; 