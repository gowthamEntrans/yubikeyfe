import React from 'react';
import axios from 'axios';

function Registration() {
  const register = async () => {
    try {
      const { data: regRequest } = await axios.post('http://localhost:3001/registration-challenge', {}, { withCredentials: true });
      window.u2f.register(regRequest.appId, [regRequest], [], async (regResponse) => {
        const response = await axios.post('http://localhost:3001/registration-verify', { registrationResponse: regResponse }, { withCredentials: true });
        if (response.status === 200) {
          alert('Registration successful');
        } else {
          alert('Registration failed: ' + response.data.errorMessage);
        }
      });
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Registration;
