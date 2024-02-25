import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  
  const handlePredict = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="App" style={{ maxWidth:'600px', margin: '0 auto', padding: '20px', textAlign: 'center'}}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Spam Detector</h1>
      <label htmlFor="userInput">Enter your message:</label>
      <input
        type="text"
        id="userInput"
        value={userInput}
        onChange={handleInputChange}
        style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', backgroundColor: 'transparent',color:'white' }}
        required
      />
      <button style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', padding: '15px 30px', borderRadius: '4px', cursor: 'pointer' }} onClick={handlePredict}>Predict</button>
      {prediction && <p>Prediction Result: {prediction}</p>}
    </div>
  );
}

export default App;
