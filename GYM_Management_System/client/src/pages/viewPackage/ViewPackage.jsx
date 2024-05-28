import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import gymLogo from './Gymflex_Logo_1.jpg'; // Path to your logo image (Base64 encoded or imported)

function ViewPackage() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/package');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      await deletePackage(id);
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/package/delete/${id}`);
      alert('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Error deleting package');
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    const logoWidth = 30; 
    const logoHeight = 30; 
    const logoX = 10; 
    const logoY = 10; 
    doc.addImage(gymLogo, 'PNG', logoX, logoY, logoWidth, logoHeight); 

    doc.setFontSize(18); 
    doc.text('GymFlex', logoX + logoWidth + 10, logoY + 10); 
    doc.setFontSize(12);
    doc.text('Standerd Package', logoX + logoWidth + 10, logoY + 20); 
    doc.text('Gym_Flex Gym, Alubomulla,Panadura', logoX + logoWidth + 10, logoY + 30); 

    doc.text('Packages Report', 14, 45); 
    autoTable(doc, {
      startY: 55, 
      theme: 'striped',
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 50 }, 2: { cellWidth: 40 }, 3: { cellWidth: 30 }, 4: { cellWidth: 'auto' } },
      head: [['Type', 'Name', 'Duration', 'Price', 'Description']],
      body: filteredPackages.map((pkg) => [
        pkg.packageType,
        pkg.packageName,
        pkg.duration,
        `Rs.${pkg.price}`,
        pkg.description,
      ]),
    });
    doc.save('packages_report.pdf');
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundImage: "url('Images/vhgdr.jpg')",
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
          style={{ textAlign: 'center', margin: '20px 0', color: 'white', fontSize: '25px' }}
        >
          Standard Package List
        </h2>

        <input
          type="text"
          placeholder="Search by Package Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '20%',
            marginBottom: '20px',
          }}
        />

        <table
          style={{
            width: '70%',
            border: '1px solid white',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr
              style={{ backgroundColor: '#007bff', color: 'white' }}
            >
              <th style={tableHeaderStyle}>Package Type</th>
              <th style={tableHeaderStyle}>Package Name</th>
              <th style={tableHeaderStyle}>Duration</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg._id}>
                <td style={tableCellStyle}>{pkg.packageType}</td>
                <td style={tableCellStyle}>{pkg.packageName}</td>
                <td style={tableCellStyle}>{pkg.duration}</td>
                <td style={tableCellStyle}>Rs.{pkg.price}</td>
                <td style={tableCellStyle}>{pkg.description}</td>
                <td style={tableCellStyle}>
                  <button style={actionButtonStyle} onClick={() => navigate(`/updatepkg/${pkg._id}`)}>
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
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

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

export default ViewPackage;
