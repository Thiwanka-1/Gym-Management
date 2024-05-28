import  { useState } from "react";
import axios from "axios";

function AddAppointment() {
    const [name, setName] = useState("");
    const [DoctorName,setDoctorName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            backgroundImage: "url('Images/background.jpg')",
            backgroundSize: "cover"
        },
        formTitle: {
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "30px"
        },
        formContainer: {
            width: "100%",
            maxWidth: "550px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
        },
        formGroup: {
            marginBottom: "20px"
        },
        input: {
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px"
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
        },
        buttonHover: {
            backgroundColor: "#555"
        }
    };

    function sendData(e) {
        e.preventDefault();
        
        const appointmentData = {
            name,
            DoctorName,
            age,
            gender,
            date,
            time
        };

        axios.post('http://localhost:3000/appointment/add', appointmentData)
            .then(() => {
                alert("Appointment Added");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.formTitle}>Doctor Appointment</h1>
            <div style={styles.formContainer}>
                <form onSubmit={sendData}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            style={styles.input}
                            id="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="name">Doctor Name</label>
                        <input
                            type="text"
                            style={styles.input}
                            id="name"
                            placeholder="Enter Name"
                            value={DoctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            style={styles.input}
                            id="age"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="gender">Gender</label>
                        <select
                            style={styles.input}
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            style={styles.input}
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            style={styles.input}
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAppointment;
