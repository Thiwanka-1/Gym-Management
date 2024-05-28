import express from 'express';
const router = express.Router();
import  Employee from "../models/EmployeeModel.js";

// Route to add a new employee.js
router.post('/add', async (req, res) => {
    const { EmpId, empName } = req.body;

    try {
        const newEmployee = new Employee({ EmpId, empName });
        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get employee details by ID
router.get('/:empId', async (req, res) => {
    try {
        const employee = await Employee.findOne({ EmpId: req.params.empId });
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;