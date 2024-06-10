import React, { useState } from 'react';
import axios from 'axios';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const { data: options } = await axios.post('http://100.26.52.215:3001/api/register-options', { username });
      console.log('Registration Options:', options);
      const attestationResponse = await startRegistration(options);
      const response = await axios.post('http://100.26.52.215:3001/api/register', { username, attestationResponse });
      setMessage(`Registered: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleAuthenticate = async () => {
    try {
      const { data: options } = await axios.post('http://100.26.52.215:3001/api/auth-options', { username });
      console.log('Authentication Options:', options);
      const assertionResponse = await startAuthentication(options);
      const response = await axios.post('http://100.26.52.215:3001/api/authenticate', { username, assertionResponse });
      setMessage(`Authenticated: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Authentication Error:', error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <h1 className="title">WebAuthn Demo</h1>
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input"
        />
      </div>
      <div className="button-container">
        <button onClick={handleRegister} className="button">Register</button>
        <button onClick={handleAuthenticate} className="button">Authenticate</button>
      </div>
      <p className="message">{message}</p>
    </div>
  );
};

export default App;
