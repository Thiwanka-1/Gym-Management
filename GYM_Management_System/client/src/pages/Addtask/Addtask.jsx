import { useState } from "react";
import axios from "axios";

function Addtask() {
    const [equipmentname, setEquipmentname] = useState("");
    const [taskname, setTaskname] = useState("");
    const [description, setDescription] = useState("");
    const [scheduledate, setScheduledate] = useState("");
    const [completionstatus, setCompletionstatus] = useState("To Do");

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "equipmentname" || id === "taskname") {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
            if (id === "equipmentname") setEquipmentname(filteredValue);
            else setTaskname(filteredValue);
        } else if (id === "scheduledate" || id === "description") {
            if (id === "scheduledate") setScheduledate(value);
            else setDescription(value);
        } else {
            if (id === "completionstatus") setCompletionstatus(value);
        }
    };

    const sendData = async (e) => {
        e.preventDefault();

        const newTask = {
            equipmentname,
            taskname,
            description,
            scheduledate,
            completionstatus,
        };

        try {
            await axios.post("http://localhost:3000/maintenance1/add", newTask);
            alert("Task added successfully!");
            resetForm();
        } catch (err) {
            alert("Error adding task: " + err.message);
        }
    };

    const resetForm = () => {
        setEquipmentname("");
        setTaskname("");
        setDescription("");
        setScheduledate("");
        setCompletionstatus("To Do");
    };

    return (
        <div
            style={{
                backgroundImage: "url('Images/task.png')",
                backgroundSize: "cover",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "400px",
                    padding: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                    color: "#333",
                }}
            >
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
                    Add Task
                </h2>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label htmlFor="equipmentname" style={{ color: "#333" }}>Equipment Name:</label>
                        <input
                            type="text"
                            id="equipmentname"
                            value={equipmentname}
                            onChange={handleInputChange}
                            placeholder="Enter equipment name"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskname" style={{ color: "#333" }}>Task Name:</label>
                        <input
                            type="text"
                            id="taskname"
                            value={taskname}
                            onChange={handleInputChange}
                            placeholder="Enter task name"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" style={{ color: "#333" }}>Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="scheduledate" style={{ color: "#333" }}>Schedule Date:</label>
                        <input
                            type="date"
                            id="scheduledate"
                            value={scheduledate}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="completionstatus" style={{ color: "#333" }}>Completion Status:</label>
                        <select
                            id="completionstatus"
                            value={completionstatus}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="To Do">To Do</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button
                            type="submit"
                            className="btn btn-dark btn-lg"
                            style={{
                                padding: "10px 20px",
                                borderRadius: "10px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
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

export default Addtask;
