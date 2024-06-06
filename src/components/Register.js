import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');

  const register = async () => {
    try {
      const { data: regRequest } = await axios.post('https://yubikeybe.onrender.com/register', { email });
      window.u2f.register(regRequest.appId, [regRequest], [], async (regResponse) => {
        const response = await axios.post('https://yubikeybe.onrender.com/register/verify', { email, registrationResponse: regResponse });
        if (response.status === 200) {
          alert('Registration successful');
        } else {
          alert('Registration failed: ' + response.data.error);
        }
      });
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
