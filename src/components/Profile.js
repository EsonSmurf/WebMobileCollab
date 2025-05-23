import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);

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
          <Link to="/results" className="nav-item">
            <img src="/icons-resultsAnalytics.png" alt="Results & Analytics Icon" />
            <span>Results & Analytics</span>
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h2  className="school-nme">STI College Balagtas</h2>
          <div className="header-right">
            <div className="notifications">
              <img src="/icons-notification.png" alt="Notifications" />
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
        {/* Profile Card */}
        <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: '#E5F0FB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 32 }}>
              <img src="/icons-profile.png" alt="Profile" style={{ width: 100, height: 100 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 40, lineHeight: 1 }}>Jayson Visnar</div>
              <div style={{ color: '#888', fontSize: 18, marginTop: 4 }}>Making your journey uniquely yours</div>
            </div>
            <button
              style={{ background: '#0066CC', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 28px', fontWeight: 600, fontSize: 20, cursor: 'pointer' }}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', margin: '24px 0' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 22 }}>Email</div>
            <div style={{ flex: 2, fontSize: 20 }}>visnar@gmail.com</div>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', margin: '24px 0' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 22 }}>Date of Birth</div>
            <div style={{ flex: 2, fontSize: 20 }}>March 15, 2003</div>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', margin: '24px 0' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 22 }}>Faculty</div>
            <div style={{ flex: 2, fontSize: 20 }}>BSIT3A</div>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', margin: '24px 0' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 22 }}>Organization</div>
            <div style={{ flex: 2, fontSize: 20 }}>BITS</div>
          </div>
        </div>
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
            
               
                  
                  </div>
                
              </div>
        
        )}
      </main>
    </div>
  );
};

export default Profile; 