import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './userProPackage.jpg';

function Updaterequest() {
  const [requestData, setRequestData] = useState({
    EmpId: '',
    Type0fEquipment: '',
    Date: '',
    Description: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequestDetails();
  }, []);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/maintenance/get/${id}`);
      setRequestData({
        EmpId: response.data.EmpId || '',
        Type0fEquipment: response.data.Type0fEquipment || '',
        Date: response.data.Date || '',
        Description: response.data.Description || ''
      });
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "EmpId") {
      // Only allow alphanumeric characters
      setRequestData({ ...requestData, [name]: value.replace(/[^a-zA-Z0-9]/g, '') });
    } else if (name === "Type0fEquipment") {
      // Only allow letters and spaces
      setRequestData({ ...requestData, [name]: value.replace(/[^a-zA-Z\s]/g, '') });
    } else {
      setRequestData({ ...requestData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/maintenance/update/${id}`, requestData);
      alert('Request updated successfully');
      navigate('/viewreq');
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error updating request');
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)' // White with slight transparency
        }}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
            fontSize:"25px" // Change to a darker color for contrast
          }}>Update Request</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Employee Id:</label>
              <input
                name="EmpId"
                value={requestData.EmpId}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Type of Equipment:</label>
              <input
                name="Type0fEquipment"
                value={requestData.Type0fEquipment}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Date:</label>
              <input
                name="Date"
                type="date"
                value={requestData.Date}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ marginRight: '10px', color: '#333' }}>Description:</label>
              <textarea
                name="Description"
                value={requestData.Description}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              ></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '4px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >Update Request</button>
              <button
                type="button"
                onClick={() => navigate('/viewreq')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '4px',
                  backgroundColor: '#ccc',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updaterequest;
