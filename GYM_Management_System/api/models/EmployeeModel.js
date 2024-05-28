import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    EmpId: {
        type: String,
        required: true,
        unique: true
    },
    empName: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeSchema);


export default Employee;

