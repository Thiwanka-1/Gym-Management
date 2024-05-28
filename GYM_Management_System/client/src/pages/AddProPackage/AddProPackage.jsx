import { useState } from 'react';
import axios from 'axios';

function AddProPackage() {
    const [packageType, setPackageType] = useState('');
    const [proPackageName, setProPackageName] = useState('');
    const [proPrice, setProPrice] = useState('');
    const [proDuration, setProDuration] = useState('');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState({});

    const validateInput = (name, value) => {
        switch (name) {
            case 'proPackageName':
                if (/\d/.test(value)) {
                    return 'Package name cannot contain numbers.';
                }
                if (!/^[a-zA-Z\s]*$/.test(value)) {
                    return 'Only letters and spaces are allowed.';
                }
                break;
            case 'proPrice':
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

        if (name === 'proPackageName' && /\d/.test(value)) {
            return; // Early exit if the package name contains numbers
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
            case 'proPackageName':
                setProPackageName(value);
                break;
            case 'proPrice':
                setProPrice(value);
                break;
            case 'proDuration':
                setProDuration(value);
                break;
            case 'reason':
                setReason(value);
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

        const newProPackage = {
            packageType,
            proPackageName,
            proPrice,
            proDuration,
            reason,
        };

        axios
            .post('http://localhost:3000/proPackage/add', newProPackage)
            .then(() => {
                alert('Promotional Package Added');
                setPackageType('');
                setProPackageName('');
                setProPrice('');
                setProDuration('');
                setReason('');
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
                padding: '20px',
                backgroundImage: "url('/Images/AddProPackage.jpg')",
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
                    Add Promotional Package
                </h2>
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
                        <label
                            htmlFor='packageName'
                            style={{ fontWeight: 'bold' }}
                        >
                            Package Name
                        </label>
                        <input
                            type='text'
                            name='proPackageName'
                            value={proPackageName}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        />
                        {errors.proPackageName && (
                            <div style={{ color: 'red' }}>{errors.proPackageName}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='proPrice'
                            style={{ fontWeight: 'bold' }}
                        >
                            Price
                        </label>
                        <input
                            type='number'
                            name='proPrice'
                            value={proPrice}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid lightgray',
                            }}
                            required
                        />
                        {errors.proPrice && (
                            <div style={{ color: 'red' }}>{errors.proPrice}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor='proDuration'
                            style={{ fontWeight: 'bold' }}
                        >
                            Duration
                        </label>
                        <input
                            type='text'
                            name='proDuration'
                            value={proDuration}
                            onChange={handleChange}
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
                        <label
                            htmlFor='reason'
                            style={{ fontWeight: 'bold' }}
                        >
                            Reason
                        </label>
                        <textarea
                            name='reason'
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
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
                                backgroundColor: 'blue',
                                color: 'white',
                                padding: '10px 30px',
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

export default AddProPackage;
