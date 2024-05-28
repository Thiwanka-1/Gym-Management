import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Example background image URL
const backgroundImage = '/Images/new.jpg';

function PaymentPage() {
  const { packageId, packageType } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        let response;
        if (packageType === 'Standard') {
          response = await axios.get(`http://localhost:3000/package/get/${packageId}`);
        } else if (packageType === 'Promotional') {
          response = await axios.get(`http://localhost:3000/proPackage/get/${packageId}`);
        }
        setPackageData(response.data.Package);
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    };

    fetchPackage();
  }, [packageId, packageType]);

  const handleNumberInput = (e) => {
    const numericValue = e.target.value.replace(/[^0-9 /]/g, '');
    const { name } = e.target;

    if (name === 'cardNumber') {
      setCardNumber(numericValue);
    } else if (name === 'expiryDate') {
      setExpiryDate(numericValue);
    } else if (name === 'cvv') {
      setCVV(numericValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/payment/create', {
        packageId,
        packageType,
        email,
        cardNumber,
        expiryDate,
        cvv,
      });

      alert('Payment successful!');
      navigate('/dashbord');
    } catch (error) {
      alert(`Error making payment: ${error.message}`);
    }
  };

  if (!packageData) {
    return (
      <div style={{ fontSize: '16px', color: '#666', textAlign: 'center', marginTop: '20px' }}>
        Loading package details...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 0',
      }}
    >
      <div
        style={{
          padding: '20px',
          maxWidth: '500px', // Adjusted the width for a more normal form size
          margin: '0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '24px', color: '#333', textAlign: 'center', marginBottom: '10px' }}>
          Payment for {packageData.packageName || packageData.proPackageName}
        </h2>
        <p style={{ fontSize: '18px', color: '#555', textAlign: 'center', marginBottom: '20px' }}>
          Price: Rs.{packageData.price || packageData.proPrice}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label
              style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '5px' }}
            >
              Email:
            </label>
            <input
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label
              style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '5px' }}
            >
              Card Number:
            </label>
            <input
              type='text'
              name='cardNumber'
              value={cardNumber}
              required
              maxLength={16}
              onChange={handleNumberInput}
              placeholder='1234 5678 9012 3456'
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label
              style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '5px' }}
            >
              Expiry Date (MM/YY):
            </label>
            <input
              type='text'
              name='expiryDate'
              value={expiryDate}
              required
              maxLength={5}
              onChange={handleNumberInput}
              placeholder='MM/YY'
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label
              style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '5px' }}
            >
              CVV:
            </label>
            <input
              type='text'
              name='cvv'
              value={cvv}
              required
              maxLength={3}
              onChange={handleNumberInput}
              placeholder='123'
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>
        
          <button
            type="submit"
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
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
