import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './userPackage.jpg';

function Updatetask() {
  const [taskData, settaskData] = useState({
    equipmentname: '',
    taskname: '',
    description: '',
    scheduledate: '',
    completionstatus: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/maintenance1/get/${id}`);
      settaskData(response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the input for taskname and equipmentname to ensure only letters and spaces
    if (name === 'taskname' || name === 'equipmentname') {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove all digits and non-letters
      settaskData({ ...taskData, [name]: filteredValue });
    } else {
      settaskData({ ...taskData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/maintenance1/update/${id}`, taskData);
      alert('Task updated successfully');
      navigate('/viewtask');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '400px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)' // White with slight transparency
          }}
        >
          <h1 style={{ textAlign: 'center', color: 'black', fontSize: '25px', marginBottom: '20px' }}>Update Task</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ color: 'black' }}>Equipment Name:</label>
              <input
                name="equipmentname"
                value={taskData.equipmentname}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ color: 'black' }}>Task Name:</label>
              <input
                name="taskname"
                value={taskData.taskname}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'black' }}>Description:</label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ color: 'black' }}>Schedule Date:</label>
              <input
                name="scheduledate"
                type="date"
                value={taskData.scheduledate}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ color: 'black' }}>Completion Status:</label>
              <select
                name="completionstatus"
                value={taskData.completionstatus}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="To Do">To Do</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="submit"
                style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Update Task
              </button>
              <button
                type="button"
                onClick={() => navigate('/viewtask')}
                style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ccc', color: 'black', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updatetask;
