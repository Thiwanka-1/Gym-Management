import { useState, useEffect } from 'react';
import axios from 'axios';

function AddRequest() {
    const [EmpId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [Type0fEquipment, setTypeofEquipment] = useState("");
    const [Date, setDate] = useState("");
    const [Description, setDescription] = useState("");

    const fetchEmployeeName = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/emp/${id}`);
            if (response.data && response.data.empName) {
                setEmpName(response.data.empName);
            } else {
                setEmpName("");
                alert("Employee ID does not exist");
            }
        } catch (error) {
            console.error("Error fetching employee name:", error);
            alert("Failed to fetch employee name");
        }
    };

    useEffect(() => {
        if (EmpId.length >= 6) {
            fetchEmployeeName(EmpId); // Fetch employee name if the ID is valid
        } else {
            setEmpName(""); // Clear the employee name if the ID is too short
        }
    }, [EmpId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "Type0fEquipment") {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Only letters and spaces
            setTypeofEquipment(filteredValue);
        } else if (id === "EmployeeId") {
            const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, ""); // Alphanumeric only
            setEmpId(alphanumericValue);
        } else if (id === "Date") {
            setDate(value);
        } else if (id === "Description") {
            setDescription(value);
        }
    };

    const sendData = async (e) => {
        e.preventDefault();

        const newMaintenance = {
            EmpId,
            empName, // Include the fetched employee name
            Type0fEquipment,
            Date,
            Description,
        };

        try {
            await axios.post("http://localhost:3000/maintenance/add", newMaintenance);
            alert("Request Added");
            resetForm();
        } catch (error) {
            console.error("Error adding request:", error);
            alert("Error adding request");
        }
    };

    const resetForm = () => {
        setEmpId("");
        setEmpName("");
        setTypeofEquipment("");
        setDate("");
        setDescription("");
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundImage: "url('Images/fff.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '550px',
                    margin: 'auto',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginTop: '50px',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '30px',
                        color: '#333',
                        fontSize: '30px',
                    }}
                >
                    Maintenance Request
                </h2>
                <form onSubmit={sendData}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="EmployeeId" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Employee ID</label>
                        <input
                            type="text"
                            id="EmployeeId"
                            placeholder="Enter Employee ID"
                            value={EmpId}
                            onChange={handleInputChange}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="EmployeeName" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Employee Name</label>
                        <input
                            type="text"
                            id="EmployeeName"
                            placeholder="Employee Name"
                            value={empName} // This is the fetched name
                            readOnly
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="Type0fEquipment" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Type of Equipment</label>
                        <input
                            type="text"
                            id="Type0fEquipment"
                            placeholder="Enter Type of Equipment"
                            value={Type0fEquipment}
                            onChange={handleInputChange}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="Date" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Date</label>
                        <input
                            type="date"
                            id="Date"
                            value={Date}
                            onChange={handleInputChange}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="Description" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
                        <input
                            type="text"
                            id="Description"
                            placeholder="Enter Description"
                            value={Description}
                            onChange={handleInputChange}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="submit"
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                color: 'white',
                                background: 'black',
                                cursor: 'pointer',
                                fontSize: '20px',
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

export default AddRequest;
