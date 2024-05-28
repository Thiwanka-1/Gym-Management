import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateWorkout() {
    const [email, setEmail] = useState('');
    const [workoutPlanRequests, setWorkoutPlanRequests] = useState([]);
    const [twoDayWorkoutPlanRequests, setTwoDayWorkoutPlanRequests] = useState([]);
    const [threeDayWorkoutPlanRequests, setThreeDayWorkoutPlanRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (email.trim() !== '') {
            fetchRequests();
        }
    }, [email]);

    const fetchRequests = async () => {
        try {
            const response1 = await axios.get(`http://localhost:3000/workoutplan/trainer/${email}`);
            setWorkoutPlanRequests(response1.data);

            const response2 = await axios.get(`http://localhost:3000/Twodayworkoutplan/trainer/${email}`);
            setTwoDayWorkoutPlanRequests(response2.data);

            const response3 = await axios.get(`http://localhost:3000/Threedayworkoutplan/trainer/${email}`);
            setThreeDayWorkoutPlanRequests(response3.data);
        } catch (error) {
            console.error('Error fetching workout plan requests:', error);
        }
    };

    const confirmDelete = async (id, type) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            await deleteRequest(id, type);
        }
    };
    

    const deleteRequest = async (id, type) => {
        try {
            await axios.delete(`http://localhost:3000/${type}/delete/${id}`);
            alert('Request deleted successfully');
            fetchRequests(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Error deleting request');
        }
    };
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div style={{ textAlign: 'center', minHeight: '100vh', backgroundImage: 'url("https://img.freepik.com/free-photo/tall-stylish-shirtless-bodybuilder-dressed-sports-shorts-doing-exercise-bicep-with-barbell-standing-studio-isolated-dark-background_613910-18341.jpg?w=996&t=st=1713328129~exp=1713328729~hmac=5734082d651a73800f4112dd825e8c4e54024c9c79cd5afd96a1f104cf603a63")',
        backgroundSize: '100% 100%', color: 'white' }}>
            <div className="container">
                <h2>Enter Trainer Email</h2>
                <input type="email" value={email} onChange={handleEmailChange}  style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        width: '100%',
        maxWidth: '400px', // Adjust the max width as needed
        backgroundColor: '#fff',
        color: '#333',
        fontSize: '16px',
    }}/>
                
                {email.trim() !== '' && (
                    <>
                        <h2>Workout Plan Requests</h2>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>CustomerId</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workoutPlanRequests.map(request => (
                                    <tr key={request._id}>
                                        <td>{request.CustomerId}</td>
                                        <td>{request.Gender}</td>
                                        <td>
                                        <button onClick={() => navigate(`/update/oneday/${request._id}`)}>Edit</button>
                                        <button onClick={() => confirmDelete(request._id, 'workoutplan')}>Delete</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Two-Day Workout Plan Requests</h2>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>CustomerId</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {twoDayWorkoutPlanRequests.map(request => (
                                    <tr key={request.id}>
                                        <td>{request.CustomerId}</td>
                                        <td>{request.Gender}</td>
                                        <td>
                                        <button onClick={() => navigate(`/update/twoday/${request._id}`)}>Edit</button>
                                        <button onClick={() => confirmDelete(request._id, 'Twodayworkoutplan')}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Three-Day Workout Plan Requests</h2>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>CustomerId</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {threeDayWorkoutPlanRequests.map(request => (
                                    <tr key={request.id}>
                                        <td>{request.CustomerId}</td>
                                        <td>{request.Gender}</td>
                                        <td>
                                        <button onClick={() => navigate(`/update/threeday/${request._id}`)}>Edit</button>
                                        <button onClick={() => confirmDelete(request._id, 'Threedayworkoutplan')}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

export default UpdateWorkout;