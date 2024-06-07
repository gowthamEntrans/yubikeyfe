import React, { useState } from 'react';
import axios from 'axios';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

const App = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const { data: options } = await axios.post('http://localhost:3001/register-options', { username });
      console.log('Registration Options:', options);
      const attestationResponse = await startRegistration(options);
      const response = await axios.post('http://localhost:3001/register', { username, attestationResponse });
      setMessage(`Registered: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleAuthenticate = async () => {
    try {
      const { data: options } = await axios.post('http://localhost:3001/auth-options', { username });
      console.log('Authentication Options:', options);
      const assertionResponse = await startAuthentication(options);
      const response = await axios.post('http://localhost:3001/authenticate', { username, assertionResponse });
      setMessage(`Authenticated: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Authentication Error:', error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1>WebAuthn Demo</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleAuthenticate}>Authenticate</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
