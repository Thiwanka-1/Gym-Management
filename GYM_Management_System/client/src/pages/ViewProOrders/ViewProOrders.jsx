import  { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ViewProOrders() {
  const [proOrders, setOrders] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/userProPkg');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching Orders:', error);
    }
  };

  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Order?')) {
      await deletePackage(id);
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/userProPkg/delete/${id}`);
      alert('Order deleted successfully');
      fetchPackages(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting Order:', error);
      alert('Error deleting order');
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text('Promotional Order Report', 14, 22);
    doc.autoTable({
      startY: 30,
      theme: 'striped',
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 50 }, 2: { cellWidth: 40 }, 3: { cellWidth: 30 }, 4: { cellWidth: 'auto' } },
      head: [['Customer Name', 'Email', 'Phone', 'Date', 'Package']],
      body: proOrders.map(pkg => [pkg.custName, pkg.proEmail, pkg.proPhone, pkg.proDate, pkg.selectedProPackage]),
    });
    doc.save('pro_order_report.pdf');
  };

  return (
    <div style={{ backgroundImage:"url('Images/bnh.jpg')",backgroundSize: "cover" ,minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ textAlign: "center", margin: "20px 0" , color: "white", fontSize:"25px"}}>Promotional Order List</h2>
        <table style={{ width: "70%", border: "1px solid white", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={tableHeaderStyle}>Customer Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Package</th>
              <th style={tableHeaderStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {proOrders.map((pkg) => (
              <tr key={pkg._id}>
                <td style={tableCellStyle}>{pkg.custName}</td>
                <td style={tableCellStyle}>{pkg.proEmail}</td>
                <td style={tableCellStyle}>{pkg.proPhone}</td>
                <td style={tableCellStyle}>{pkg.proDate}</td>
                <td style={tableCellStyle}>{pkg.selectedProPackage}</td>
                <td style={tableCellStyle}>
                  <button style={actionButtonStyle} onClick={() => confirmDelete(pkg._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={downloadReport} style={{ marginTop: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'center' }}>
          Download Report
        </button>
      </div>
    </div>
  );
}

// Styles
const tableHeaderStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  backgroundColor : "rgba(255, 255, 255, 0.9)",
};

const actionButtonStyle = {
  marginRight: "10px",
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ViewProOrders;
