import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './ddd.jpg';

function UpdatePackage() {
  const [packageData, setPackageData] = useState({ packageName: '', duration: '', price: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/package/get/${id}`);
      setPackageData({
        packageName: response.data.packageName || '',
        duration: response.data.duration || '',
        price: response.data.price || '',
        description: response.data.description || ''
      });
    } catch (error) {
      console.error('Error fetching package details:', error);
      setPackageData({ packageName: '', duration: '', price: '', description: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'packageName') {
      // Only allow letters and spaces in packageName
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-letters
      setPackageData({ ...packageData, [name]: filteredValue });
    } else if (name === 'price') {
      // Only allow digits in price
      const filteredValue = value.replace(/[^0-9]/g, ''); // Remove non-digits
      setPackageData({ ...packageData, [name]: filteredValue });
    } else {
      setPackageData({ ...packageData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/package/update/${id}`, packageData);
      alert('Package updated successfully');
      navigate('/viewpkg');
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '20px', color: '#000' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' , fontSize:"25px"}}>Update Package</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Package Name:</label>
              <input name="packageName" value={packageData.packageName} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Duration:</label>
              <input name="duration" value={packageData.duration} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Price:</label>
              <input name="price" type="number" value={packageData.price} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Description:</label>
              <textarea name="description" value={packageData.description} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Update Package</button>
              <button type="button" onClick={() => navigate('/viewpkg')} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ccc', color: 'black', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePackage;
