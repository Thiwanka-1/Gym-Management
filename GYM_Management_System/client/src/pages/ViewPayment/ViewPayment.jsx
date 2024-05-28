import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Background image for the payment history page
const backgroundImage = '/Images/bghf.jpg';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/payment');
        setPayments(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = dayjs(dateString);
    if (!date.isValid()) {
      return 'Invalid Date';
    }
    return date.format('DD/MM/YYYY');
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add header text to the PDF
    doc.text('Payment Report', 14, 16);

    let totalStandard = 0;
    let totalPromotional = 0;
    let countStandard = 0;
    let countPromotional = 0;

    const tableData = payments.map((payment) => {
      const formattedDate = formatDate(payment.paymentDate);

      // Calculate totals and counts for summary
      if (payment.packageType === 'Standard') {
        totalStandard += payment.price;
        countStandard++;
      } else if (payment.packageType === 'Promotional') {
        totalPromotional += payment.price;
        countPromotional++;
      }

      return [
        payment.email,
        payment.packageType,
        payment.packageName,
        `Rs.${payment.price}`,
        formattedDate,
      ];
    });

    // Create the table in the PDF
    doc.autoTable({
      head: [['Email', 'Package Type', 'Package Name', 'Price', 'Date']],
      body: tableData,
      startY: 20,
    });

    // Add summary information
    const totalPackages = countStandard + countPromotional;
    const totalRevenue = totalStandard + totalPromotional;

    doc.text(`Standard Packages Sold: ${countStandard}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Revenue from Standard Packages: Rs.${totalStandard}`, 14, doc.lastAutoTable.finalY + 20);

    doc.text(`Promotional Packages Sold: ${countPromotional}`, 14, doc.lastAutoTable.finalY + 30);
    doc.text(`Total Revenue from Promotional Packages: Rs.${totalPromotional}`, 14, doc.lastAutoTable.finalY + 40);

    doc.text(`Total Packages Sold: ${totalPackages}`, 14, doc.lastAutoTable.finalY + 50);
    doc.text(`Total Revenue from All Packages: Rs.${totalRevenue}`, 14, doc.lastAutoTable.finalY + 60);

    // Download the PDF
    doc.save('payments_report.pdf');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Payment History</h2>
        
        {payments.length === 0 ? (
          <div style={{ textAlign: 'center', fontSize: '18px' }}>No payments found.</div>
        ) : (
          <>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '16px',
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Package Type</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Package Name</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Price (Rs.)</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.email}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.packageType}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{payment.packageName}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{`Rs.${payment.price}`}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatDate(payment.paymentDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={generatePDF}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
              >
                Download as PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentsPage;
