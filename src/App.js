import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Voters from './components/Voters';
import Candidates from './components/Candidates';
import Elections from './components/Elections';
import Logs from './components/Logs';
import Results from './components/Results';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import ExportLogs from './components/ExportLogs';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/voters" 
              element={
                <ProtectedRoute>
                  <Voters />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/candidates" 
              element={
                <ProtectedRoute>
                  <Candidates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/elections" 
              element={
                <ProtectedRoute>
                  <Elections />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logs" 
              element={
                <ProtectedRoute>
                  <Logs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="/export-logs" element={<ExportLogs />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
