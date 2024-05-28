import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserPackage() {
  const [cusName, setCusName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(''); // Store selected package ID
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate for navigation

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

  const validateInput = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'cusName':
        if (/\d/.test(value)) {
          errorMessage = 'Customer name cannot contain numbers.';
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          errorMessage = 'Only letters and spaces are allowed.';
        }
        break;
      case 'phone':
        if (!/^\d+$/.test(value)) {
          errorMessage = 'Phone number must contain only digits.';
        } else if (value.length < 10) {
          errorMessage = 'Phone number must be at least 10 digits long.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Invalid email format.';
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input
    const error = validateInput(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    switch (name) {
      case 'cusName':
        setCusName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'selectedPackage':
        setSelectedPackage(value); // Set the selected package ID
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors before submission
    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please correct the errors before submitting.');
      return;
    }

    // If there are no errors, redirect to the payment page with the selected package ID
    navigate(`/payment/${selectedPackage}/Standard`, {
      state: { email },
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundImage: "url('/Images/UserPackage.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Select Package
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='cusName' style={{ fontWeight: 'bold' }}>
              Customer Name
            </label>
            <input
              type='text'
              name='cusName'
              value={cusName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid lightgray',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='email' style={{ fontWeight: 'bold' }}>
              Email
            </label>
            <input
              type='email'
              name='email'
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid lightgray',
              }}
              value={email}
              onChange={handleChange}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='phone' style={{ fontWeight: 'bold' }}>
              Phone Number
            </label>
            <input
              type='tel'
              required
              name='phone'
              value={phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid lightgray',
              }}
            />
            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='date' style={{ fontWeight: 'bold' }}>
              Date
            </label>
            <input
              type='date'
              name='date'
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid lightgray',
              }}
              value={date}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor='selectedPackage' style={{ fontWeight: 'bold' }}>
              Select Package
            </label>
            <select
              name='selectedPackage'
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid lightgray',
              }}
              value={selectedPackage}
              onChange={handleChange}
            >
              <option value=''>Select a Package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.packageName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              type='submit'
              style={{
                padding: '10px 30px',
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserPackage;
