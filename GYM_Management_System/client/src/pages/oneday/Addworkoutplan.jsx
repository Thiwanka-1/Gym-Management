import  { useState } from 'react';
import axios from 'axios';
import './AddWorkoutForm.css';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20
  },
  section: {
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold'
  }
});

function AddWorkoutForm() {
  const [email, setEmail] = useState('');
  const [CustomerId ,setcustomerId] = useState('');
  const [gender, setGender] = useState('');
  const [exercises, setExercises] = useState([
    { exercise: '', sets: '', reps: '' },
    { exercise: '', sets: '', reps: '' },
    { exercise: '', sets: '', reps: '' }
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [pdfData, setPdfData] = useState(null); // State to hold generated PDF data
  

  const handleExerciseChange = (index, key, value) => {
    const newExercises = [...exercises];
    newExercises[index][key] = value;
    setExercises(newExercises);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { exercise: '', sets: '', reps: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/workoutplan/add', {
        Email: email,
        CustomerId:CustomerId,
        Gender: gender,
        exercises: exercises
      });
      alert(response.data); 

      // Generate PDF
      const pdfDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.label}>Email:</Text>
              <Text>{email}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>CustomerId:</Text>
              <Text>{CustomerId}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Gender:</Text>
              <Text>{gender}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Exercises:</Text>
              {exercises.map((exercise, index) => (
                <View key={index} style={styles.section}>
                  <Text>{`${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      );
      setPdfData(pdfDoc);

      // Clear form fields
      setEmail('');
      setcustomerId('');
      setGender('');
      setExercises([{ exercise: '', sets: '', reps: '' }]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  return (
    <div>
      <div className='container1'>
        <h1 className='h1'>One Day Workout Plan</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label className='label'>
            Email:
            <input className={`input3 ${isValidEmail ? '' : 'invalid'}`} type="text" value={email} onChange={handleEmailChange} />
          </label>
          <label className='label'>
          CustomerId:
            <input className='input' value={CustomerId} onChange={(e) => setcustomerId(e.target.value)}  />
          </label>
          <br />
          <label className='label'>
            Gender:
            <select className='select' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="option">option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <br /><br />
          <label className='label2'>
            Exercises:
            {exercises.map((exercise, index) => (
              <div className='label1' key={index}>
                <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)} placeholder="Exercise" />
                <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} placeholder="Sets" />
                <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} placeholder="Reps" />
              </div>
            ))}
            <br /><button className='button1' type="button" onClick={handleAddExercise}>Add Exercise</button>
          </label>
          <br />
          <button className='button2' type="submit">Add Workout Plan</button>
        </form>
      </div>
      {pdfData && (
        <div className="generated-pdf">
          <h2 className="generated-pdf-heading">Generated PDF:</h2>
          <PDFDownloadLink document={pdfData} fileName="workout_plan.pdf">
            {({ loading}) => (loading ? 'Generating PDF...' : <button className="download-pdf-button">Download PDF</button>)}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default AddWorkoutForm;
