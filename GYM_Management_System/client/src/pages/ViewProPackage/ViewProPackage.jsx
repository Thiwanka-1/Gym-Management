import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ViewProPackage() {
  const [proPackages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/proPackage');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const filteredPackages = proPackages.filter((pkg) =>
    pkg.proPackageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      await deletePackage(id);
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/proPackage/delete/${id}`);
      alert('Package deleted successfully');
      fetchPackages(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Error deleting package');
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text('Promotional Packages Report', 14, 22);
    doc.autoTable({
      startY: 30,
      theme: 'striped',
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 50 }, 2: { cellWidth: 40 }, 3: { cellWidth: 30 }, 4: { cellWidth: 'auto' } },
      head: [['Type', 'Name', 'Price', 'Duration', 'Reason']],
      body: filteredPackages.map((pkg) => [pkg.packageType, pkg.proPackageName, `Rs.${pkg.proPrice}`, pkg.proDuration, pkg.reason]),
    });
    doc.save('pro_packages_report.pdf');
  };

  return (
    <div
      style={{
        backgroundImage: "url('Images/saf.jpg')",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{ textAlign: 'center', margin: '20px 0', color: 'white', fontSize:"25px" }}
        >
          Promotional Package List
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Package Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          style={{
            padding: '10px',
            width: '20%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        />

        <table
          style={{
            width: '70%',
            border: '1px solid white',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={tableHeaderStyle}>Package Type</th>
              <th style={tableHeaderStyle}>Package Name</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Duration</th>
              <th style={tableHeaderStyle}>Reason</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg._id}>
                <td style={tableCellStyle}>{pkg.packageType}</td>
                <td style={tableCellStyle}>{pkg.proPackageName}</td>
                <td style={tableCellStyle}>Rs.{pkg.proPrice}</td>
                <td style={tableCellStyle}>{pkg.proDuration}</td>
                <td style={tableCellStyle}>{pkg.reason}</td>
                <td style={tableCellStyle}>
                  <button style={actionButtonStyle} onClick={() => navigate(`/updatepropkg/${pkg._id}`)}>
                    Edit
                  </button>
                  <button style={actionButtonStyle} onClick={() => confirmDelete(pkg._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={downloadReport}
          style={{
            marginTop: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'center',
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

// Styles for table headers, cells, and action buttons
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
};

const actionButtonStyle = {
  marginRight: '10px',
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ViewProPackage;
