import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './image.png';

function UpdateProPackage() {
  const [proPackageData, setProPackageData] = useState({ proPackageName: '', proPrice: '', proDuration: '', reason: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/proPackage/get/${id}`);
        setProPackageData({
          proPackageName: response.data.proPackageName || '',
          proPrice: response.data.proPrice || '',
          proDuration: response.data.proDuration || '',
          reason: response.data.reason || ''
        });
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };
  
    fetchPackageDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'proPackageName') {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
      setProPackageData({ ...proPackageData, [name]: filteredValue });
    } else if (name === 'proPrice') {
      const filteredValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
      setProPackageData({ ...proPackageData, [name]: filteredValue });
    } else {
      setProPackageData({ ...proPackageData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/proPackage/update/${id}`, proPackageData);
      alert('Package updated successfully');
      navigate('/viewpro');
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '20px', color: '#000' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize:"25px" }}>Update Package</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Package Name:</label>
              <input name="proPackageName" value={proPackageData.proPackageName} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Price:</label>
              <input name="proPrice" type="number" value={proPackageData.proPrice} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Duration:</label>
              <input name="proDuration"  value={proPackageData.proDuration} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Reason:</label>
              <textarea name="reason" value={proPackageData.reason} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000' }}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Update Package</button>
              <button type="button" onClick={() => navigate('/viewpro')} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ccc', color: 'black', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProPackage;
