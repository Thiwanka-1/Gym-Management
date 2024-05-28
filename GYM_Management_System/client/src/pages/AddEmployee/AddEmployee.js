import { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
    const [EmpId, setEmpId] = useState('');
    const [empName, setEmpName] = useState('');

    const addEmployee = async (e) => {
        e.preventDefault();

        const newEmployee = {
            EmpId,
            empName
        };

        try {
            await axios.post('http://localhost:3000/emp/add', newEmployee);
            alert("Employee added successfully!");
            setEmpId('');
            setEmpName('');
        } catch (error) {
            alert("Error adding employee: " + error.message);
        }
    };

    return (
        <div>
            <h2>Register Employee</h2>
            <form onSubmit={addEmployee}>
                <div>
                    <label htmlFor="empId">Employee ID:</label>
                    <input
                        type="text"
                        id="empId"
                        value={EmpId}
                        onChange={(e) => setEmpId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="empName">Employee Name:</label>
                    <input
                        type="text"
                        id="empName"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AddEmployee;
