import React, { useState } from 'react';
import axios from 'axios';

function AddPackage() {
    const [packageType, setPackageType] = useState('');
    const [packageName, setPackageName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const validateInput = (name, value) => {
        switch (name) {
            case 'packageName':
                if (/\d/.test(value)) {
                    return 'Package name cannot contain numbers.';
                }
                if (!/^[a-zA-Z\s]*$/.test(value)) {
                    return 'Only letters and spaces are allowed.';
                }
                break;
            case 'price':
                if (value < 0) {
                    return 'Price cannot be negative.';
                }
                break;
            default:
                break;
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Early exit if packageName contains numbers
        if (name === 'packageName' && /\d/.test(value)) {
            return;
        }

        const error = validateInput(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));

        switch (name) {
            case 'packageType':
                setPackageType(value);
                break;
            case 'packageName':
                setPackageName(value);
                break;
            case 'duration':
                setDuration(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const sendData = (e) => {
        e.preventDefault();

        if (Object.values(errors).some((error) => error !== '')) {
            alert('Please correct the errors before submitting.');
            return;
        }

        const newPackage = {
            packageType,
            packageName,
            duration,
            price,
            description,
        };

        axios
            .post('http://localhost:3000/package/add', newPackage)
            .then(() => {
                alert('Package added successfully.');
                setPackageType('');
                setPackageName('');
                setDuration('');
                setPrice('');
                setDescription('');
                setErrors({});
            })
            .catch((err) => {
                alert('Error: ' + err.message);
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
                backgroundImage: "url('/Images/AddPackage.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
            }}
        >
            <div
                style={{
                    width: '90%',
                    maxWidth: '500px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', color: 'black' }}>Add Package</h2>
                <form onSubmit={sendData}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="packageType" style={{ fontWeight: 'bold' }}>Package Type</label>
                        <select
                            name="packageType"
                            id="packageType"
                            onChange={handleChange}
                            value={packageType}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        >
                            <option value="">Select Package Type</option>
                            <option value="Standard">Standard</option>
                            <option value="Promotional">Promotional</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="packageName" style={{ fontWeight: 'bold' }}>Package Name</label>
                        <input
                            type="text"
                            name="packageName"
                            id="packageName"
                            onChange={handleChange}
                            value={packageName}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        />
                        {errors.packageName && (
                            <div style={{ color: 'red' }}>{errors.packageName}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="duration" style={{ fontWeight: 'bold' }}>Duration</label>
                        <input
                            type='text'
                            name='duration'
                            onChange={handleChange}
                            value={duration}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor='price' style={{ fontWeight: 'bold' }}>Price</label>
                        <input
                            type='number'
                            name='price'
                            onChange={handleChange}
                            value={price}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        />
                        {errors.price && (
                            <div style={{ color: 'red' }}>{errors.price}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor='description' style={{ fontWeight: 'bold' }}>Description</label>
                        <textarea
                            name='description'
                            onChange={handleChange}
                            value={description}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        />
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

export default AddPackage;
