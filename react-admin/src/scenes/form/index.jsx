import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data.predictions);
    } catch (error) {
      console.error('Error:', error);
      setPrediction(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Real or Fake Voice Predictor</h1>
      <input type="file" accept=".wav" onChange={handleFileChange} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }} />
      <button onClick={handleSubmit} style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', padding: '15px 30px', borderRadius: '4px', cursor: 'pointer' }}>
        Predict
      </button>
      {prediction && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '50px', fontWeight: 'bold', marginBottom: '10px' }}>Prediction:</h2>
          <p style={{ fontSize: '70px'}}>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
