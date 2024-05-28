import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProPackage() {
    const [custName, setCustName] = useState('');
    const [proEmail, setProEmail] = useState('');
    const [proPhone, setProPhone] = useState('');
    const [proDate, setProDate] = useState('');
    const [proPackages, setProPackages] = useState([]);
    const [selectedProPackage, setSelectedProPackage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/proPackage');
            setProPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const validateInput = (name, value) => {
        switch (name) {
            case 'proEmail':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    return 'Invalid email format.';
                }
                break;
            case 'proPhone':
                if (!/^\d+$/.test(value)) {
                    return 'Phone number must contain only digits.';
                }
                if (value.length < 10) {
                    return 'Phone number must be at least 10 digits.';
                }
                break;
            default:
                return '';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'custName' && /\d/.test(value)) {
          return; // Early exit if the package name contains numbers
      }

        const error = validateInput(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));

        switch (name) {
            case 'custName':
                setCustName(value);
                break;
            case 'proEmail':
                setProEmail(value);
                break;
            case 'proPhone':
                setProPhone(value);
                break;
            case 'proDate':
                setProDate(value);
                break;
            case 'selectedProPackage':
                setSelectedProPackage(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).some((error) => error !== '')) {
            alert('Please correct the errors before submitting.');
            return;
        }

        try {
            const selectedPackage = proPackages.find(
                (pkg) => pkg.proPackageName === selectedProPackage
            );

            if (!selectedPackage) {
                alert('Please select a valid package.');
                return;
            }

            const newPackage = {
                custName,
                proEmail,
                proPhone,
                proDate,
                selectedProPackage,
            };

            // Store the user information in the database
            await axios.post('http://localhost:3000/userProPkg/add', newPackage);

            // Navigate to the payment page with the selected package's ID and price
            navigate(`/payment/${selectedPackage._id}/Promotional`, {
                state: {
                    packagePrice: selectedPackage.proPrice,
                },
            });
        } catch (error) {
            alert('Error: ' + error.message);
        }
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
                backgroundImage: "url('/Images/UserProPackage.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                    }}
                >
                    Select Promotional Package
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='custName'
                            style={{ fontWeight: 'bold' }}
                        >
                            Customer Name
                        </label>
                        <input
                            type='text'
                            name='custName'
                            required
                            value={custName}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='proEmail'
                            style={{ fontWeight: 'bold' }}
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            name='proEmail'
                            required
                            value={proEmail}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                        />
                        {errors.proEmail && (
                            <div style={{ color: 'red' }}>{errors.proEmail}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='proPhone'
                            style={{ fontWeight: 'bold' }}
                        >
                            Phone Number
                        </label>
                        <input
                            type='tel'
                            name='proPhone'
                            required
                            value={proPhone}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                        />
                        {errors.proPhone && (
                            <div style={{ color: 'red' }}>{errors.proPhone}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='proDate'
                            style={{ fontWeight: 'bold' }}
                        >
                            Date
                        </label>
                        <input
                            type='date'
                            required
                            name='proDate'
                            value={proDate}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='selectedProPackage'
                            style={{ fontWeight: 'bold' }}
                        >
                            Select Package
                        </label>
                        <select
                            name='selectedProPackage'
                            value={selectedProPackage}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                        >
                            <option value=''>Select a Package</option>
                            {proPackages.map((pkg) => (
                                <option key={pkg._id} value={pkg.proPackageName}>
                                    {pkg.proPackageName}
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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProPackage;
