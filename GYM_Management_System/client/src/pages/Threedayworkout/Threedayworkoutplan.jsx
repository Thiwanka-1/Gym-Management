import { useState } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import './AddWorkoutForm.css';

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

function Threedayworkoutplanform() {
  const [email, setEmail] = useState('');
  const [CustomerId ,setcustomerId] = useState('');
  const [gender, setGender] = useState('');
  const [exercises1, setExercises1] = useState([{ exercise: '', sets: '', reps: '' }]);
  const [exercises2, setExercises2] = useState([{ exercise: '', sets: '', reps: '' }]);
  const [exercises3, setExercises3] = useState([{ exercise: '', sets: '', reps: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [pdfData, setPdfData] = useState(null); // State to hold generated PDF data

  const handleExerciseChange = (index, key, value, day) => {
    switch (day) {
      case 1:
        setExercises1(prevState => {
          const updatedExercises = [...prevState];
          updatedExercises[index][key] = value;
          return updatedExercises;
        });
        break;
      case 2:
        setExercises2(prevState => {
          const updatedExercises = [...prevState];
          updatedExercises[index][key] = value;
          return updatedExercises;
        });
        break;
      case 3:
        setExercises3(prevState => {
          const updatedExercises = [...prevState];
          updatedExercises[index][key] = value;
          return updatedExercises;
        });
        break;
      default:
        break;
    }
  };

  const handleAddExercise = (day) => {
    switch (day) {
      case 1:
        setExercises1(prevState => [...prevState, { exercise: '', sets: '', reps: '' }]);
        break;
      case 2:
        setExercises2(prevState => [...prevState, { exercise: '', sets: '', reps: '' }]);
        break;
      case 3:
        setExercises3(prevState => [...prevState, { exercise: '', sets: '', reps: '' }]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/Threedayworkoutplan/add', {
        Email: email,
        CustomerId:CustomerId,
        Gender: gender,
        exercises1: exercises1,
        exercises2: exercises2,
        exercises3: exercises3
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
              <Text style={styles.label}>Exercises for Day 1:</Text>
              {exercises1.map((exercise, index) => (
                <View key={index} style={styles.section}>
                  <Text>{`${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`}</Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Exercises for Day 2:</Text>
              {exercises2.map((exercise, index) => (
                <View key={index} style={styles.section}>
                  <Text>{`${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`}</Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Exercises for Day 3:</Text>
              {exercises3.map((exercise, index) => (
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
      setExercises1([{ exercise: '', sets: '', reps: '' }]);
      setExercises2([{ exercise: '', sets: '', reps: '' }]);
      setExercises3([{ exercise: '', sets: '', reps: '' }]);
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
        <div>
          <h1 className='h1'>Three Days Workout Plan</h1>
          {errorMessage && <div>{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <label className='label'>
              Email:
              <input className={`input3 ${isValidEmail ? '' : 'invalid'}`} type="text" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label className='label'>
          CustomerId:
            <input className='input' value={CustomerId} onChange={(e) => setcustomerId(e.target.value)}  />
          </label>
            <label className='label'>
              Gender:
              <select className='select' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="option">option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <br /><br />
            <div className='label2'>
              <div>
                <h3>One Day</h3>
                {exercises1.map((exercise, index) => (
                  <div className='label1' key={index}>
                    <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value, 1)} placeholder="Exercise" />
                    <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value, 1)} placeholder="Sets" />
                    <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value, 1)} placeholder="Reps" />
                  </div>
                ))}
                <br /><button className='button1' type="button" onClick={() => handleAddExercise(1)}>Add Exercise</button>
              </div>
            </div>
            <br />
            <div className='label2'>
              <div>
                <h3>Second Day</h3>
                {exercises2.map((exercise, index) => (
                  <div className='label1' key={index}>
                    <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value, 2)} placeholder="Exercise" />
                    <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value, 2)} placeholder="Sets" />
                    <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value, 2)} placeholder="Reps" />
                  </div>
                ))}
                <br /><button className='button1' type="button" onClick={() => handleAddExercise(2)}>Add Exercise</button>
              </div>
            </div>
            <br />
            <div className='label2'>
              <div>
                <h3>Three Day</h3>
                {exercises3.map((exercise, index) => (
                  <div className='label1' key={index}>
                    <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value, 3)} placeholder="Exercise" />
                    <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value, 3)} placeholder="Sets" />
                    <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value, 3)} placeholder="Reps" />
                  </div>
                ))}
                <br /><button className='button1' type="button" onClick={() => handleAddExercise(3)}>Add Exercise</button>
              </div>
            </div>
            <br />
            <button className='button2' type="submit">Add Workout Plan</button>
          </form>
        </div>
      </div>
      {pdfData && (
        <div className="generated-pdf">
          <h2 className="generated-pdf-heading">Generated PDF:</h2>
          <PDFDownloadLink document={pdfData} fileName="workout_plan.pdf">
            {({  loading }) => (loading ? 'Generating PDF...' : <button className="download-pdf-button">Download PDF</button>)}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default Threedayworkoutplanform;
