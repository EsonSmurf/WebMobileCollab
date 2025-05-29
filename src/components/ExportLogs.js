import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change this line
import jsPDF from 'jspdf';

import './Logs.css'; // Import your existing styles


const ExportLogs = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Change this line

    useEffect(() => {
        // Fetch logs from the backend
        const fetchLogs = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await fetch('/api/logs'); // Adjust the endpoint as needed
                const data = await response.json();
                setLogs(data); // Set the fetched logs to state
                // Here you can add logic to connect to your Laravel backend to fetch logs from the database
            } catch (error) {
                console.error('Error fetching logs:', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false); // Stop loading after 0.8 seconds
                }, 800);
            }
        };

        fetchLogs();
    }, []);
    

    const handleExportLogs = () => {
        setIsLoading(true);
        setTimeout(() => {
            // Navigate to the export-logs page
            // This is a placeholder and should be replaced with actual navigation logic
            console.log('Exporting logs');
            setIsLoading(false);
        }, 800); // 0.8 seconds
    };

    const handleBackToLogs = () => {
        navigate('/logs'); // Change this line
    };

    return (
        <div className="export-logs-container">
            
            <button onClick={handleBackToLogs} className="back-to-logs-btn">Back</button> {/* Back button */}
            <h2>Export Logs</h2>
            <br></br>
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date Changed</th>
                            <th>Position</th>
                            <th>History Log</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.dateChanged}</td>
                                <td>{log.position}</td>
                                <td>{log.historyLog}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            )}
        </div>
    );
};

export default ExportLogs;
