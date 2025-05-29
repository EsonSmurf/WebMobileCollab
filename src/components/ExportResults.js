import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css'; // Import your CSS for styling

const ExportResults = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/results'); // Adjust the endpoint as needed
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, []);

    const handleExportPDF = () => {
        // Logic to export results as PDF
        console.log('Exporting results as PDF');
        // You can use libraries like jsPDF or html2canvas for this
    };

    const handlePrint = () => {
        window.print(); // Simple print functionality
    };

    const handleBackToResults = () => {
        navigate('/results'); // Navigate back to the Results page
    };

    return (
        <div className="export-results-container">
            <button onClick={handleBackToResults} className="back-to-results-btn">Back</button>
            <h2>Export Results</h2>
            <br></br>
            {isLoading ? (
                <div className="loading-containers">
                    <div className="loading-spinners"></div>
                </div>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Candidate</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.position}</td>
                                    <td>{result.candidate}</td>
                                    <td>{result.votes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="export-buttons">
                        <button onClick={handleExportPDF} className="export-pdf-btn">Export as PDF</button>
                        <button onClick={handlePrint} className="print-btn">Print</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExportResults;
